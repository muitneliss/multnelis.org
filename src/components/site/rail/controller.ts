/*
  The one owner of the rail's motion. It measures the page into document
  coordinates (on load, font load, resize and language change, never while
  scrolling) and, on animation frames, moves the pen toward where the scroll
  says it belongs and writes what the pure timeline draws there: lane strokes
  and commit nodes. Nothing else writes these.
*/
import { type Branch, type Lane, type RailNode, type SectionKind, railGeometry, sectionShape } from './geometry';
import { type Layout, type PathTrack, computeFrame, drawHead, followHead } from './timeline';

const NS = 'http://www.w3.org/2000/svg';
const COLOR: Record<Lane, string> = { m: 'var(--ink)', u: 'var(--lane-u)', y: 'var(--lane-y)', t: 'var(--lane-t)' };

const html = document.documentElement;

const mk = (name: string, attrs: Record<string, string | number>) => {
  const el = document.createElementNS(NS, name);
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
  return el;
};

/** Document y of an element's top. */
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

  let layout: Layout | null = null;
  let pathEls: SVGPathElement[] = [];
  let nodeEls: SVGGElement[] = [];
  /* Last written values, so a frame only touches what changed. */
  let written: Float32Array = new Float32Array(0);
  /* The pen: where the drawing currently ends, in document y. It starts at the top of the screen, so the rail draws itself in on arrival. */
  let pen = NaN;
  let lastFrame = 0;

  function measure() {
    const W = parseFloat(getComputedStyle(html).getPropertyValue('--rail')) || 120;
    const g = railGeometry(W);
    const paths: PathTrack[] = [];
    const nodes: RailNode[] = [];
    pathEls = [];
    nodeEls = [];

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

      const strokes = shape.paths.map((p) => mk('path', { class: 'lane-' + p.lane, d: p.d }) as SVGPathElement);
      const dots = shape.nodes.map((n) => nodeElement(g, n) as SVGGElement);
      svg.setAttribute('viewBox', `0 0 ${W} ${Math.round(H)}`);
      svg.setAttribute('width', String(W));
      svg.setAttribute('height', String(Math.round(H)));
      svg.replaceChildren(...strokes, ...dots);

      shape.paths.forEach((p, i) => {
        const t = track(p.lane, p.points, top);
        if (!still) strokes[i].setAttribute('stroke-dasharray', String(t.total + 40));
        paths.push(t);
        pathEls.push(strokes[i]);
      });
      shape.nodes.forEach((n, i) => {
        nodes.push({ ...n, y: n.y + top });
        nodeEls.push(dots[i]);
      });
    }

    layout = { docHeight: html.scrollHeight, paths, nodes };
    written = new Float32Array(paths.length + nodes.length).fill(NaN);
  }

  function render(now: number) {
    if (!layout || still) return;
    const view = { scrollY: window.scrollY, height: html.clientHeight };
    const target = drawHead(view, layout.docHeight);
    if (Number.isNaN(pen)) pen = view.scrollY;
    pen = followHead(pen, target, lastFrame ? now - lastFrame : 0, view.height);
    lastFrame = pen === target ? 0 : now;

    const frame = computeFrame(layout, pen, view.height);
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

    /* Until the pen arrives, keep drawing. */
    if (pen !== target) schedule();
  }

  let queued = false;
  let dirty = true;
  function schedule(remeasure = false) {
    dirty ||= remeasure;
    if (queued) return;
    queued = true;
    requestAnimationFrame((now) => {
      queued = false;
      if (dirty) {
        dirty = false;
        measure();
      }
      render(now);
    });
  }

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
