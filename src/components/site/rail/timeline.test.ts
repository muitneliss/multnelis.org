import { describe, expect, test } from 'vitest';

import { type Layout, type PathTrack, TIMELINE, computeFrame, drawHead, followHead } from './timeline';

/* A page 4000px tall, read in a window 900px tall: main runs the whole page,
   with a commit at 1200 and the last commit near the bottom. */
const VH = 900;
const DOC = 4000;

function straight(y0: number, y1: number): PathTrack {
  const n = (y1 - y0) / 8 + 1;
  const ys = Float32Array.from({ length: n }, (_, i) => y0 + i * 8);
  return { lane: 'm', xs: new Float32Array(n).fill(24), ys, lengths: ys.map((y) => y - y0), total: y1 - y0 };
}

const layout: Layout = {
  docHeight: DOC,
  paths: [straight(0, DOC)],
  nodes: [
    { x: 24, y: 1200, lane: 'm', size: 'commit', hollow: false },
    { x: 24, y: DOC - 80, lane: 'm', size: 'big', hollow: false },
  ],
};

/** Let the pen follow a scroll position for `ms` milliseconds of 60fps frames. */
function settle(pen: number, scrollY: number, ms = 3000) {
  const target = drawHead({ scrollY, height: VH }, DOC);
  for (let t = 0; t < ms; t += 16) pen = followHead(pen, target, 16, VH);
  return pen;
}

describe('rail timeline', () => {
  test('the pen rests at its place down the screen, and a lane is drawn down to it and no further', () => {
    const head = drawHead({ scrollY: 1000, height: VH }, DOC);
    expect(head).toBeCloseTo(1000 + VH * TIMELINE.head);
    expect(computeFrame(layout, head, VH).drawn[0]).toBeCloseTo(head, 0);
  });

  test('a commit lands only once the pen reaches it', () => {
    expect(computeFrame(layout, 1199, VH).nodes[0]).toBe(0);
    expect(computeFrame(layout, 1200 + VH * 0.04, VH).nodes[0]).toBe(1);
  });

  test('the last commit has landed when the page is scrolled to the bottom', () => {
    const head = drawHead({ scrollY: DOC - VH, height: VH }, DOC);
    const frame = computeFrame(layout, head, VH);
    expect(frame.drawn[0]).toBe(DOC);
    expect(frame.nodes[1]).toBe(1);
  });

  test('a wheel step is drawn as a stroke, not a jump', () => {
    const before = drawHead({ scrollY: 1000, height: VH }, DOC);
    const after = drawHead({ scrollY: 1100, height: VH }, DOC);
    const next = followHead(before, after, 16, VH);
    expect(next).toBeGreaterThan(before);
    expect(next).toBeLessThan(after);
  });

  test('the pen settles on the same place whichever way the reader came', () => {
    const fromAbove = settle(drawHead({ scrollY: 0, height: VH }, DOC), 1500);
    const fromBelow = settle(drawHead({ scrollY: 3000, height: VH }, DOC), 1500);
    expect(fromAbove).toBe(drawHead({ scrollY: 1500, height: VH }, DOC));
    expect(fromBelow).toBe(fromAbove);
  });

  test('a long jump draws out only its last screen', () => {
    const next = followHead(0, 3000, 0, VH);
    expect(next).toBe(3000 - VH);
  });

  test('reduced motion draws the whole history', () => {
    const frame = computeFrame(layout, Infinity, VH);
    expect(frame.drawn[0]).toBe(DOC);
    expect(Array.from(frame.nodes)).toEqual([1, 1]);
  });
});
