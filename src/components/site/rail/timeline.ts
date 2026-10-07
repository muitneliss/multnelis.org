/*
  The page's scroll timeline. Pure: from the draw head's position it says how
  far each lane is drawn and which commits have landed, and from the scroll
  position it says where the head belongs. The head is the pen: everything on
  the rail above it is drawn, nothing below it exists yet.

  See docs/interactive-landing/scroll-timeline.md for the numbers below.
*/
import type { Lane, RailNode } from './geometry';

export const TIMELINE = {
  /** Where the draw head rests, as a share of the viewport height from its top. */
  head: 0.85,
  /** A commit lands over this share of the viewport after the head reaches it. */
  nodeWindow: 0.04,
  /** The pen follows the scroll with this time constant, in ms, so a wheel step draws as one stroke. */
  follow: 140,
  /** A jump farther than this many viewports (a link, the scrollbar) is not drawn out stroke by stroke. */
  jump: 1,
} as const;

export type { Lane };

/** One rail path as a polyline in document coordinates, with the distance along it at each point. `ys` never decreases. */
export interface PathTrack {
  lane: Lane;
  xs: Float32Array;
  ys: Float32Array;
  lengths: Float32Array;
  total: number;
}

export interface Layout {
  docHeight: number;
  paths: PathTrack[];
  /** Every commit, in document coordinates. */
  nodes: RailNode[];
}

export interface Viewport {
  scrollY: number;
  height: number;
}

export interface Frame {
  /** Drawn length of each path, in px. */
  drawn: Float32Array;
  /** Landing progress of each node, 0..1. */
  nodes: Float32Array;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Where `value` sits between `start` and `end`, clamped to 0..1. Every progress value passes through here. */
export const normalize = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const smooth = (t: number) => t * t * (3 - 2 * t);

/** The site's `--ease`, cubic-bezier(0.19, 1, 0.22, 1), for a commit landing. */
export const ease = cubicBezier(0.19, 1, 0.22, 1);

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const x = (t: number) => ((ax * t + bx) * t + cx) * t;
  const y = (t: number) => ((ay * t + by) * t + cy) * t;
  return (u: number) => {
    if (u <= 0) return 0;
    if (u >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = u;
    while (hi - lo > 1e-5) {
      if (x(t) < u) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return y(t);
  };
}

/**
 * Where the draw head belongs at this scroll position: 85% down the viewport,
 * sliding to its bottom over the last viewport of scroll so the final commit
 * lands as the page bottoms out.
 */
export function drawHead(view: Viewport, docHeight: number) {
  const max = Math.max(0, docHeight - view.height);
  const end = max <= 0 ? 1 : normalize(view.scrollY, max - view.height, max);
  return view.scrollY + view.height * (TIMELINE.head + (1 - TIMELINE.head) * smooth(end));
}

/**
 * Move the pen from `pen` toward `target` over `dt` ms. It eases in, so a
 * wheel step draws as one stroke rather than a jump, and it always arrives:
 * the same scroll position settles on the same picture whichever way you came.
 * A long jump is cut to its last viewport, so only what is on screen is drawn out.
 */
export function followHead(pen: number, target: number, dt: number, viewportHeight: number) {
  const far = TIMELINE.jump * viewportHeight;
  const from = Math.abs(target - pen) > far ? target - Math.sign(target - pen) * far : pen;
  const next = lerp(from, target, 1 - Math.exp(-Math.max(0, dt) / TIMELINE.follow));
  return Math.abs(target - next) < 0.5 ? target : next;
}

/** How much of a path lies above document y `y`, in px along the path. */
function drawnLength(track: PathTrack, y: number) {
  const { ys, lengths } = track;
  const last = ys.length - 1;
  if (y <= ys[0]) return 0;
  if (y >= ys[last]) return track.total;
  let lo = 0;
  let hi = last;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (ys[mid] <= y) lo = mid;
    else hi = mid;
  }
  const span = ys[hi] - ys[lo];
  return span > 0 ? lerp(lengths[lo], lengths[hi], (y - ys[lo]) / span) : lengths[hi];
}

/** What the rail shows with the pen at document y `head`. Pass `Infinity` to draw the whole history. */
export function computeFrame(layout: Layout, head: number, viewportHeight: number): Frame {
  const drawn = new Float32Array(layout.paths.length);
  layout.paths.forEach((p, i) => (drawn[i] = drawnLength(p, head)));
  const nodes = new Float32Array(layout.nodes.length);
  const window = TIMELINE.nodeWindow * viewportHeight;
  layout.nodes.forEach((n, i) => (nodes[i] = ease(normalize(head, n.y, n.y + window))));
  return { drawn, nodes };
}
