import { describe, expect, test } from 'vitest';

import { type Layout, type PathTrack, type Viewport, computeFrame } from './timeline';
import { projectRailPoint } from './overture';

/* A page 4000px tall, read in a 1440×900 window: main runs the whole page,
   one commit at 1200 with a heading and a tagline arriving after it, and the
   last commit near the bottom. */
const VIEW = { width: 1440, height: 900, phone: false };
const DOC = 4000;

function straight(y0: number, y1: number): PathTrack {
  const n = (y1 - y0) / 4 + 1;
  const ys = Float32Array.from({ length: n }, (_, i) => y0 + i * 4);
  return { lane: 'm', xs: new Float32Array(n).fill(24), ys, lengths: ys.map((y) => y - y0), total: y1 - y0 };
}

const layout: Layout = {
  docHeight: DOC,
  paths: [straight(0, DOC)],
  nodes: [
    { x: 24, y: 1200, lane: 'm', size: 'commit', hollow: false },
    { x: 24, y: DOC - 80, lane: 'm', size: 'big', hollow: false },
  ],
  arrivals: [
    { y: 1200, order: 0 },
    { y: 1200, order: 1 },
  ],
  overture: null,
};

const at = (scrollY: number): Viewport => ({ ...VIEW, scrollY });

describe('scroll timeline', () => {
  test('the same scroll position gives the same frame, whichever way the reader arrived', () => {
    const down = computeFrame(layout, at(800));
    computeFrame(layout, at(2400));
    const back = computeFrame(layout, at(800));
    expect(back).toEqual(down);
  });

  test('a lane is drawn down to the draw head at 66% of the viewport, and no further', () => {
    const frame = computeFrame(layout, at(1000));
    expect(frame.head).toBeCloseTo(1000 + 900 * 0.66);
    expect(frame.drawn[0]).toBeCloseTo(1000 + 900 * 0.66, 0);
  });

  test('a commit lands only once the head reaches it', () => {
    expect(computeFrame(layout, at(1200 - 900 * 0.66 - 1)).nodes[0]).toBe(0);
    expect(computeFrame(layout, at(1200)).nodes[0]).toBe(1);
  });

  test('the last commit has landed when the page is scrolled to the bottom', () => {
    const frame = computeFrame(layout, at(DOC - 900));
    expect(frame.drawn[0]).toBe(DOC);
    expect(frame.nodes[1]).toBe(1);
  });

  test('a heading arrives after its commit, and its tagline after the heading', () => {
    const landed = 1200 - 900 * 0.66;
    const early = computeFrame(layout, at(landed + 40));
    expect(early.arrivals[0]).toBeGreaterThan(0);
    expect(early.arrivals[1]).toBe(0);
    const late = computeFrame(layout, at(landed + 900 * 0.2));
    expect(Array.from(late.arrivals)).toEqual([1, 1]);
  });

  test('under reduced motion the whole history is drawn and every heading is in place at the top', () => {
    const frame = computeFrame(layout, at(0), true);
    expect(frame.drawn[0]).toBe(DOC);
    expect(Array.from(frame.nodes)).toEqual([1, 1]);
    expect(Array.from(frame.arrivals)).toEqual([1, 1]);
    expect(frame.overture).toBeNull();
  });
});

describe('overture', () => {
  /* The hero band sits at 800–1250 and the first commit at (24, 230). */
  const withOverture: Layout = {
    ...layout,
    overture: { band: { top: 800, height: 450 }, pivot: { x: 24, y: 230 }, laneSpan: 72 },
  };
  const diveStart = 800 - 450;
  const diveEnd = diveStart + 900;

  test('the whole history starts inside the hero band', () => {
    const view = at(diveStart);
    const o = computeFrame(withOverture, view).overture!;
    const first = projectRailPoint(o, view, { x: 24, y: 230 }, { x: 24, y: 230 });
    const last = projectRailPoint(o, view, { x: 24, y: 230 }, { x: 24, y: DOC });
    const bandOnScreen = { top: 800 - diveStart, bottom: 1250 - diveStart };
    expect(first.y).toBeGreaterThanOrEqual(bandOnScreen.top);
    expect(last.y).toBeLessThanOrEqual(bandOnScreen.bottom);
  });

  test('the overture lands every point of the graph on the pixel the flat rail draws it on', () => {
    const view = at(diveEnd);
    const o = computeFrame(withOverture, view).overture!;
    expect(o.canvas).toBe(0);
    for (const point of [
      { x: 24, y: 230 },
      { x: 72, y: diveEnd + 100 },
      { x: 96, y: diveEnd + 850 },
    ]) {
      const p = projectRailPoint(o, view, { x: 24, y: 230 }, point);
      expect(p.x).toBeCloseTo(point.x, 2);
      expect(p.y).toBeCloseTo(point.y - diveEnd, 2);
    }
  });
});
