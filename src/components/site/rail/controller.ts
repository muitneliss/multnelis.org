/*
  The one owner of the graph's motion. It measures the page into document
  coordinates (on load, font load, resize and language change, never while
  scrolling), and on each animation frame turns the scroll position into a
  frame through the pure timeline and writes it: lane strokes, commit nodes,
  arriving headings, and the overture's 3D view. Nothing else writes these.
*/
import { type Branch, type Lane, type RailNode, type SectionKind, railGeometry, sectionShape } from './geometry';
import { type Layout, type PathTrack, TIMELINE, computeFrame } from './timeline';
import type { Overture } from './overture';

const NS = 'http://www.w3.org/2000/svg';
const COLOR: Record<Lane, string> = { m: 'var(--ink)', u: 'var(--lane-u)', y: 'var(--lane-y)', t: 'var(--lane-t)' };

const html = document.documentElement;

const mk = (name: string, attrs: Record<string, string | number>) => {
  const el = document.createElementNS(NS, name);
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
  return el;
};

/** Document y of an element's top, ignoring transforms (arriving elements are translated). */
function docTop(el: HTMLElement) {
  let y = 0;
  for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) y += e.offsetTop;
  return y;
}

function nodeElement(g: ReturnType<typeof railGeometry>, n: RailNode) {
  const grp = mk('g', { class: 'node' });
  if (n.size === 'fork') {
    grp.appendChild(mk('circle', { cx: n.x, cy: n.y, r: g.fork, fill: COLOR.m }));
    return grp;
  }
  const r = n.size === 'big' ? g.R : g.r;
  const ring = n.size === 'big' ? g.ringR : g.ring;
  if (n.hollow) {
    grp.appendChild(mk('circle', { cx: n.x, cy: n.y, r: r + ring + 1.5, fill: '#fff' }));
    grp.appendChild(mk('circle', { cx: n.x, cy: n.y, r, fill: '#fff', stroke: COLOR[n.lane], 'stroke-width': ring }));
  } else {
    grp.appendChild(
      mk('circle', { cx: n.x, cy: n.y, r: r + ring / 2, fill: COLOR[n.lane], stroke: '#fff', 'stroke-width': ring })
    );
  }
  return grp;
}

/** A path's polyline in document coordinates, with the distance along the path at each point. */
function track(lane: Lane, points: Float32Array, top: number): PathTrack {
  const n = points.length / 2;
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);
  const lengths = new Float32Array(n);
  let total = 0;
  for (let i = 0; i < n; i++) {
    xs[i] = points[i * 2];
    ys[i] = points[i * 2 + 1] + top;
    if (i > 0) total += Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]);
    lengths[i] = total;
  }
  return { lane, xs, ys, lengths, total };
}

const lanes = (s: string | undefined) => (s || '').split(',').filter(Boolean) as Branch[];

export function startRail() {
  const still = html.classList.contains('is-static');
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.gs'));
  const band = document.querySelector<HTMLElement>('[data-overture]');

  let layout: Layout | null = null;
  let geometry = railGeometry(120);
  let pathEls: SVGPathElement[] = [];
  let nodeEls: SVGGElement[] = [];
  let arriveEls: HTMLElement[] = [];
  const forced = new Set<HTMLElement>();
  /* Last written values, so a frame only touches what changed. */
  let written: Float32Array = new Float32Array(0);

  let overture: Overture | null = null;
  let overtureState: 'idle' | 'loading' | 'ready' | 'failed' = 'idle';

  function measure() {
    const W = parseFloat(getComputedStyle(html).getPropertyValue('--rail')) || 120;
    const g = railGeometry(W);
    geometry = g;
    const paths: PathTrack[] = [];
    const nodes: RailNode[] = [];
    const arrivals: Layout['arrivals'] = [];
    pathEls = [];
    nodeEls = [];
    arriveEls = [];
    let pivot: { x: number; y: number } | null = null;

    for (const sec of sections) {
      const svg = sec.querySelector<SVGSVGElement>(':scope > svg.rail');
      if (!svg) continue;
      const top = docTop(sec);
      const H = Math.max(1, sec.offsetHeight);
      const anchorEl = sec.querySelector<HTMLElement>('[data-anchor]');
      const A = anchorEl ? docTop(anchorEl) - top + anchorEl.offsetHeight / 2 : H / 2;
      const shape = sectionShape(g, {
        kind: sec.dataset.kind as SectionKind,
        height: H,
        anchor: A,
        lane: sec.dataset.lane as Branch | undefined,
        merge: lanes(sec.dataset.merge),
        through: lanes(sec.dataset.through),
        hollow: sec.hasAttribute('data-hollow'),
      });

      const ghosts = shape.paths.map((p) => mk('path', { class: 'ghost', d: p.d }));
      const strokes = shape.paths.map((p) => mk('path', { class: 'lane-' + p.lane, d: p.d }) as SVGPathElement);
      const dots = shape.nodes.map((n) => nodeElement(g, n) as SVGGElement);
      svg.setAttribute('viewBox', `0 0 ${W} ${Math.round(H)}`);
      svg.setAttribute('width', String(W));
      svg.setAttribute('height', String(Math.round(H)));
      svg.replaceChildren(...ghosts, ...strokes, ...dots);

      shape.paths.forEach((p, i) => {
        const t = track(p.lane, p.points, top);
        if (!still) strokes[i].setAttribute('stroke-dasharray', String(t.total + 40));
        paths.push(t);
        pathEls.push(strokes[i]);
      });
      shape.nodes.forEach((n, i) => {
        nodes.push({ ...n, y: n.y + top });
        nodeEls.push(dots[i]);
        if (sec.dataset.kind === 'hero' && n.size === 'big') pivot = { x: n.x, y: n.y + top };
      });
      for (const el of sec.querySelectorAll<HTMLElement>('[data-arrive]')) {
        arrivals.push({ y: A + top, order: Number(el.dataset.arrive) || 0 });
        arriveEls.push(el);
      }
    }

    const showOverture = !still && band && pivot && html.classList.contains('has-overture');
    layout = {
      docHeight: html.scrollHeight,
      paths,
      nodes,
      arrivals,
      overture: showOverture
        ? { band: { top: docTop(band), height: band.offsetHeight }, pivot: pivot!, laneSpan: g.x.t - g.x.m }
        : null,
    };
    written = new Float32Array(paths.length + nodes.length + arrivals.length).fill(NaN);
    overture?.setLayout(layout, g);
  }

  const viewport = () => ({
    scrollY: window.scrollY,
    width: html.clientWidth,
    height: html.clientHeight,
    phone: geometry.phone,
  });

  function loadOverture() {
    overtureState = 'loading';
    import('./overture')
      .then(({ mountOverture }) => {
        overture = mountOverture(band!);
        overture.setLayout(layout!, geometry);
        overtureState = 'ready';
        schedule();
      })
      .catch(() => {
        /* No WebGL or the chunk failed: the page falls back to the flat rail. */
        overtureState = 'failed';
        html.classList.remove('has-overture');
        html.style.removeProperty('--rail-opacity');
        schedule(true);
      });
  }

  function render() {
    if (!layout || still) return;
    const view = viewport();
    const frame = computeFrame(layout, view, false);
    let w = 0;

    layout.paths.forEach((p, i) => {
      const d = frame.drawn[i];
      if (written[w] !== d) {
        written[w] = d;
        /* Dash of length total + 40 shifted so it ends `d` along the path; hidden past the start when 0. */
        pathEls[i].style.strokeDashoffset = String(d <= 0 ? p.total + 60 : p.total + 40 - d);
      }
      w++;
    });

    frame.nodes.forEach((t, i) => {
      if (written[w] !== t) {
        written[w] = t;
        nodeEls[i].style.transform = t >= 1 ? '' : `scale(${0.6 + 0.4 * t})`;
        nodeEls[i].style.opacity = String(t);
      }
      w++;
    });

    const rise = view.phone ? TIMELINE.arrive.distancePhone : TIMELINE.arrive.distance;
    frame.arrivals.forEach((t0, i) => {
      const el = arriveEls[i];
      const t = forced.has(el) ? 1 : t0;
      if (written[w] !== t) {
        written[w] = t;
        el.style.translate = t >= 1 ? '' : `0 ${((1 - t) * rise).toFixed(2)}px`;
        el.style.opacity = t >= 1 ? '' : String(t);
      }
      w++;
    });
    html.classList.add('is-driven');

    const o = frame.overture;
    if (o) {
      /* The flat rail waits under the 3D view and is fully drawn before the view fades off it. */
      html.style.setProperty('--rail-opacity', o.canvas < 1 ? '1' : '0');
      if (o.progress < 1 && overtureState === 'idle') loadOverture();
      overture?.render(o, view);
    } else {
      html.style.removeProperty('--rail-opacity');
      overture?.render(null, view);
    }
  }

  let queued = false;
  let dirty = true;
  function schedule(remeasure = false) {
    dirty ||= remeasure;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      if (dirty) {
        dirty = false;
        measure();
      }
      render();
    });
  }

  /* A focused element inside an arriving heading (a repository chip reached by Tab) is shown in place. */
  document.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-arrive]');
    if (!el) return;
    forced.add(el);
    schedule();
  });
  document.addEventListener('focusout', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-arrive]');
    if (!el) return;
    forced.delete(el);
    schedule();
  });

  schedule(true);
  window.addEventListener('scroll', () => schedule(), { passive: true });
  window.addEventListener('resize', () => schedule(true));
  window.addEventListener('load', () => schedule(true));
  document.fonts?.ready.then(() => schedule(true));
  /* The language toggle changes line counts, so the anchors move. */
  document.addEventListener('multnelis:lang', () => schedule(true));
  const ro = new ResizeObserver(() => schedule(true));
  sections.forEach((s) => ro.observe(s));
}
