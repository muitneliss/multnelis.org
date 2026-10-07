/*
  The commit graph's shape for one section: which lanes run where, and where
  the commits sit. Pure: it takes the section's measured height and anchor and
  returns, for each lane, the SVG path data and the same path as a polyline,
  so the flat rail, the scroll timeline and the 3D overture share one shape.
*/

/** `m` is main; `u`, `y`, `t` are the project lanes (see src/data/site.ts). */
export type Lane = 'm' | 'u' | 'y' | 't';
export type Branch = Exclude<Lane, 'm'>;

export type SectionKind = 'hero' | 'fork' | 'merge' | 'through' | 'end';

export interface SectionSpec {
  kind: SectionKind;
  /** Section height and the anchor's vertical centre, in px. */
  height: number;
  anchor: number;
  /** The forking lane of a `fork` section. */
  lane?: Branch;
  merge: Branch[];
  through: Branch[];
  hollow: boolean;
}

export interface RailPath {
  lane: Lane;
  d: string;
  /** The path as a polyline, x and y interleaved, in section coordinates; y never decreases. */
  points: Float32Array;
}

export interface RailNode {
  x: number;
  y: number;
  lane: Lane;
  /** `fork` is the small dot on main a branch leaves from; `big` opens and closes the history. */
  size: 'fork' | 'commit' | 'big';
  hollow: boolean;
}

export interface RailShape {
  paths: RailPath[];
  nodes: RailNode[];
}

/** Farthest lane first, so the nearest draws on top. */
const FAR_TO_NEAR: Branch[] = ['t', 'y', 'u'];

export function railGeometry(width: number) {
  const phone = width < 80;
  return {
    width,
    phone,
    x: { m: width * 0.2, u: width * 0.4, y: width * 0.6, t: width * 0.8 } as Record<Lane, number>,
    /** Commit radius and white ring; big is the first and last commit; fork is the dot on main. */
    r: phone ? 6 : 8,
    ring: phone ? 2.5 : 3,
    R: phone ? 10 : 14,
    ringR: phone ? 3 : 4,
    fork: phone ? 3 : 4.5,
    /** Merge bend reach, fork reach, and the hero lanes' run before they converge. */
    D: phone ? 44 : 76,
    B: phone ? 96 : 168,
    run: phone ? 112 : 190,
  };
}
export type RailGeometry = ReturnType<typeof railGeometry>;

const f = (n: number) => Math.round(n * 100) / 100;

/** Polyline resolution: straight runs are cut every STEP px, each S-curve into CURVE pieces. */
const STEP = 8;
const CURVE = 24;

/** A lane drawn from (x, y) by straight runs and S-curves, recorded as SVG path data and as a polyline. */
function trace(lane: Lane, x: number, y: number) {
  const d = [`M ${f(x)} ${f(y)}`];
  const pts = [x, y];
  let cx = x;
  let cy = y;
  const api = {
    line(x1: number, y1: number) {
      d.push(`L ${f(x1)} ${f(y1)}`);
      const n = Math.max(1, Math.ceil(Math.hypot(x1 - cx, y1 - cy) / STEP));
      for (let i = 1; i <= n; i++) pts.push(cx + ((x1 - cx) * i) / n, cy + ((y1 - cy) * i) / n);
      cx = x1;
      cy = y1;
      return api;
    },
    /* S-curve to another lane column: both control points sit at the vertical midpoint. */
    bend(x1: number, y1: number) {
      const ym = (cy + y1) / 2;
      d.push(`C ${f(cx)} ${f(ym)} ${f(x1)} ${f(ym)} ${f(x1)} ${f(y1)}`);
      for (let i = 1; i <= CURVE; i++) {
        const t = i / CURVE;
        const u = 1 - t;
        const a = u * u * u;
        const b = 3 * u * u * t;
        const c = 3 * u * t * t;
        const e = t * t * t;
        pts.push(a * cx + b * cx + c * x1 + e * x1, a * cy + (b + c) * ym + e * y1);
      }
      cx = x1;
      cy = y1;
      return api;
    },
    done: (): RailPath => ({ lane, d: d.join(' '), points: Float32Array.from(pts) }),
  };
  return api;
}

export function sectionShape(g: RailGeometry, s: SectionSpec): RailShape {
  const H = Math.max(1, Math.round(s.height));
  const A = s.anchor;
  const xm = g.x.m;
  const paths: RailPath[] = [];
  const nodes: RailNode[] = [];
  const straight = (l: Lane) => paths.push(trace(l, g.x[l], 0).line(g.x[l], H).done());

  if (s.kind === 'hero') {
    /* Main starts at the first commit and runs to the bottom; every project lane converges into it. */
    paths.push(trace('m', xm, A).line(xm, H).done());
    for (const l of FAR_TO_NEAR) {
      const x = g.x[l];
      const top = Math.max(8, A - g.run);
      paths.push(trace(l, x, 0).line(x, top).bend(xm, A).done());
    }
    nodes.push({ x: xm, y: A, lane: 'm', size: 'big', hollow: false });
  }

  /* A project branches off main; its node sits beside the project's name. */
  if (s.kind === 'fork' && s.lane) {
    straight('m');
    s.through.forEach(straight);
    const x = g.x[s.lane];
    const B = Math.min(g.B, A - 10);
    const y0 = A - B;
    const y1 = A - B * 0.22;
    paths.push(trace(s.lane, xm, y0).bend(x, y1).line(x, H).done());
    nodes.push({ x: xm, y: y0, lane: 'm', size: 'fork', hollow: false });
    nodes.push({ x, y: A, lane: s.lane, size: 'commit', hollow: false });
  }

  if (s.kind === 'merge') {
    straight('m');
    s.through.forEach(straight);
    for (const l of FAR_TO_NEAR.filter((k) => s.merge.includes(k))) {
      const x = g.x[l];
      const D = Math.min(g.D, A - 8, H - A - 8);
      paths.push(
        trace(l, x, 0)
          .line(x, A - D)
          .bend(xm, A)
          .bend(x, A + D)
          .line(x, H)
          .done()
      );
    }
    nodes.push({ x: xm, y: A, lane: 'm', size: 'commit', hollow: s.hollow });
  }

  /* A heading between rows: every lane passes straight through, no commit. */
  if (s.kind === 'through') {
    straight('m');
    s.through.forEach(straight);
  }

  if (s.kind === 'end') {
    paths.push(trace('m', xm, 0).line(xm, A).done());
    for (const l of FAR_TO_NEAR.filter((k) => s.merge.includes(k))) {
      const x = g.x[l];
      const D = Math.min(g.D, A - 8);
      paths.push(
        trace(l, x, 0)
          .line(x, A - D)
          .bend(xm, A)
          .done()
      );
    }
    nodes.push({ x: xm, y: A, lane: 'm', size: 'big', hollow: false });
  }

  return { paths, nodes };
}
