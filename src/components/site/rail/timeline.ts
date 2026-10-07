/*
  The page's scroll timeline. A pure function from the scroll position to
  everything the graph shows: how far each lane is drawn, which commits have
  landed, which headings have arrived, and where the overture's camera is.
  Same scroll position, same frame: that is what makes reverse scrolling, a
  scrollbar jump and a reload mid-page all land in the right state.

  See docs/interactive-landing/scroll-timeline.md for the ranges below.
*/
import type { Lane, RailNode } from './geometry';

export const TIMELINE = {
  /** Where the draw head rests, as a share of the viewport height from its top. */
  head: 0.66,
  /** A commit lands over this share of the viewport after the head reaches it. */
  nodeWindow: 0.04,
  arrive: {
    /** A heading arrives over this share of the viewport, after its commit has landed. */
    window: 0.12,
    /** Each following element in a scene starts this much later. */
    stagger: 0.06,
    /** How far an arriving element rises, in px. */
    distance: 16,
    distancePhone: 12,
  },
  overture: {
    /** Vertical field of view of the camera, in degrees. */
    fov: 30,
    /** How far the graph tilts away from the viewer at the start, in degrees. */
    tilt: 74,
    tiltPhone: 66,
    /** The tilted graph sits inside the band with this share of the band's height free above and below. */
    inset: 0.16,
    /** Share of the viewport width the lanes span at the near end. */
    span: 0.22,
    spanPhone: 0.5,
    /** Scroll the dive takes, in viewport heights, starting when the band's top reaches mid-viewport. */
    dive: 1,
    labels: [0.2, 0.5],
    camera: [0.2, 0.85],
    rewind: [0.5, 0.9],
    handoff: [0.95, 1],
  },
} as const;

export type { Lane };

/** One rail path sampled along its length, in document coordinates. `ys` never decreases. */
export interface PathTrack {
  lane: Lane;
  xs: Float32Array;
  ys: Float32Array;
  lengths: Float32Array;
  total: number;
}

/** An element that arrives after the commit at `y`, `order` steps behind the first. */
export interface Arrival {
  y: number;
  order: number;
}

export interface OvertureLayout {
  /** The hero band the overture is shown in, in document coordinates. */
  band: { top: number; height: number };
  /** The first commit: the point the whole graph pivots around. */
  pivot: { x: number; y: number };
  /** Distance from main to the farthest lane on the flat rail, in px. */
  laneSpan: number;
}

export interface Layout {
  docHeight: number;
  paths: PathTrack[];
  /** Every commit, in document coordinates. */
  nodes: RailNode[];
  arrivals: Arrival[];
  overture: OvertureLayout | null;
}

export interface Viewport {
  scrollY: number;
  width: number;
  height: number;
  phone: boolean;
}

export interface OvertureState {
  progress: number;
  /** Rotation of the graph's plane away from the viewer, in radians. */
  tilt: number;
  /** Uniform scale of the graph. */
  scale: number;
  /** Extra horizontal spacing between lanes, on top of `scale`. */
  spread: number;
  /** Where the first commit is placed, in document coordinates. */
  pivot: { x: number; y: number };
  labels: number;
  /** Below this document y the graph shows only its hairline. */
  limit: number;
  /** Opacity of the 3D view; the flat rail shows at `1 - canvas`. */
  canvas: number;
}

export interface Frame {
  /** The draw head, in document coordinates. */
  head: number;
  /** Drawn length of each path, in px. */
  drawn: Float32Array;
  /** Landing progress of each node, 0..1. */
  nodes: Float32Array;
  /** Arrival progress of each arriving element, 0..1. */
  arrivals: Float32Array;
  overture: OvertureState | null;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Where `value` sits between `start` and `end`, clamped to 0..1. Every progress value passes through here. */
export const normalize = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** For moves that run continuously under the scroll: no sudden start or stop. */
const smooth = (t: number) => t * t * (3 - 2 * t);

/** The site's `--ease`, cubic-bezier(0.19, 1, 0.22, 1), for things that land. */
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

/** Distance at which the camera sees the page plane at 1:1. */
export const cameraDistance = (viewportHeight: number) =>
  viewportHeight / 2 / Math.tan(((TIMELINE.overture.fov / 2) * Math.PI) / 180);

/**
 * The draw head rests at 66% of the viewport and slides to its bottom over the
 * last viewport of scroll, so the final commit lands as the page bottoms out.
 */
export function drawHead(view: Viewport, docHeight: number) {
  const max = Math.max(0, docHeight - view.height);
  const end = max <= 0 ? 1 : normalize(view.scrollY, max - view.height, max);
  return view.scrollY + view.height * (TIMELINE.head + (1 - TIMELINE.head) * smooth(end));
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

function overtureState(o: OvertureLayout, layout: Layout, view: Viewport, head: number): OvertureState {
  const C = TIMELINE.overture;
  const start = o.band.top - view.height / 2;
  const p = normalize(view.scrollY, start, start + view.height * C.dive);

  /*
    Fit the tilted graph into the band. A point at distance `l` below the
    pivot on a plane tilted by θ and scaled by k lands, seen from distance D,
    at (a + l·k·cosθ)·D / (D + l·k·sinθ) below the pivot's screen line; solve
    for the k that puts the last commit at the band's lower inset.
  */
  const tilt0 = ((view.phone ? C.tiltPhone : C.tilt) * Math.PI) / 180;
  const D = cameraDistance(view.height);
  const length = Math.max(1, layout.docHeight - o.pivot.y);
  const inset = C.inset * o.band.height;
  const room = o.band.height - inset;
  const denom = length * (D * Math.cos(tilt0) - room * Math.sin(tilt0));
  const scale0 = denom > 0 ? Math.min(1, Math.max(0.02, (D * (room - inset)) / denom)) : 0.02;
  const nearSpan = view.width * (view.phone ? C.spanPhone : C.span);

  const cam = smooth(normalize(p, C.camera[0], C.camera[1]));
  const scale = scale0 ** (1 - cam);
  /* The lanes' span on the page plane tightens with the camera, from the band's width to the rail's. */
  const span = lerp(Math.max(nearSpan, o.laneSpan), o.laneSpan, cam);
  const from = { x: view.width / 2 - nearSpan / 2, y: o.band.top + inset };

  return {
    progress: p,
    tilt: lerp(tilt0, 0, cam),
    scale,
    spread: span / (o.laneSpan * scale),
    pivot: { x: lerp(from.x, o.pivot.x, cam), y: lerp(from.y, o.pivot.y, cam) },
    labels: 1 - normalize(p, C.labels[0], C.labels[1]),
    limit: lerp(layout.docHeight, head, smooth(normalize(p, C.rewind[0], C.rewind[1]))),
    canvas: 1 - normalize(p, C.handoff[0], C.handoff[1]),
  };
}

/** Everything the page shows at this scroll position. `still` (reduced motion) draws the whole history. */
export function computeFrame(layout: Layout, view: Viewport, still = false): Frame {
  const head = still ? Infinity : drawHead(view, layout.docHeight);
  const vh = view.height;
  const A = TIMELINE.arrive;

  const drawn = new Float32Array(layout.paths.length);
  layout.paths.forEach((p, i) => (drawn[i] = drawnLength(p, head)));

  const nodes = new Float32Array(layout.nodes.length);
  layout.nodes.forEach((n, i) => (nodes[i] = ease(normalize(head, n.y, n.y + TIMELINE.nodeWindow * vh))));

  const arrivals = new Float32Array(layout.arrivals.length);
  layout.arrivals.forEach((a, i) => {
    const start = a.y + a.order * A.stagger * vh;
    arrivals[i] = ease(normalize(head, start, start + A.window * vh));
  });

  const overture = !still && layout.overture ? overtureState(layout.overture, layout, view, head) : null;
  return { head, drawn, nodes, arrivals, overture };
}
