/*
  The overture: the page's whole commit graph in 3D. The graph lies on a plane
  that starts tilted away from the viewer inside the hero band and, as the
  timeline's camera progress runs to 1, rotates flat, scales to 1:1 and moves
  onto the rail column. The camera always sees the page plane at 1:1 from the
  viewport's centre, so at progress 1 every point of the graph sits on exactly
  the pixel the flat SVG rail draws it on, and the rail takes over unseen.

  Loaded on demand by the controller; it only ever reads the timeline's state.
*/
import {
  CircleGeometry,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

import type { Lane, RailGeometry, RailNode } from './geometry';
import { type Layout, type OvertureState, type Viewport, TIMELINE, cameraDistance, ease, normalize } from './timeline';

export interface Overture {
  setLayout(layout: Layout, geometry: RailGeometry): void;
  /** Draws the state, or hides the view when `state` is null or fully handed off. */
  render(state: OvertureState | null, view: Viewport): void;
}

/** Point the camera at the page plane so that it is seen at 1:1, centred on the viewport. */
export function fitCamera(camera: PerspectiveCamera, view: Viewport) {
  const D = cameraDistance(view.height);
  camera.fov = TIMELINE.overture.fov;
  camera.aspect = view.width / view.height;
  camera.near = 1;
  camera.far = D * 40;
  camera.position.set(view.width / 2, -(view.scrollY + view.height / 2), D);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
}

/**
 * Place the graph's plane. Points are stored relative to the first commit
 * (`pivot` on the flat rail) with y flipped up; the plane moves that commit to
 * `state.pivot` and tilts about it, and `lanes` stretches the lanes apart.
 */
export function poseGraph(plane: Object3D, lanes: Object3D, state: OvertureState) {
  plane.position.set(state.pivot.x, -state.pivot.y, 0);
  plane.rotation.set(state.tilt, 0, 0);
  lanes.scale.set(state.spread * state.scale, state.scale, 1);
  plane.updateMatrixWorld(true);
}

/** Where a point of the flat rail (document coordinates) appears on screen under `state`. */
export function projectRailPoint(
  state: OvertureState,
  view: Viewport,
  pivot: { x: number; y: number },
  point: { x: number; y: number }
) {
  const camera = new PerspectiveCamera();
  fitCamera(camera, view);
  const plane = new Group();
  const lanes = new Group();
  plane.add(lanes);
  poseGraph(plane, lanes, state);
  const v = new Vector3(point.x - pivot.x, -(point.y - pivot.y), 0).applyMatrix4(lanes.matrixWorld).project(camera);
  return { x: ((v.x + 1) / 2) * view.width, y: ((1 - v.y) / 2) * view.height };
}

/** First sample index past document y `y`, so the segments before it lie above `y`. */
function segmentsAbove(ys: Float32Array, y: number) {
  let lo = 0;
  let hi = ys.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (ys[mid] <= y) lo = mid + 1;
    else hi = mid;
  }
  return Math.max(0, lo - 1);
}

export function mountOverture(band: HTMLElement): Overture {
  const stage = band.querySelector<HTMLElement>('.stage')!;
  const canvas = stage.querySelector('canvas')!;
  const labels = new Map<string, HTMLElement>();
  stage.querySelectorAll<HTMLElement>('[data-label]').forEach((el) => labels.set(el.dataset.label!, el));

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const plane = new Group();
  const lanes = new Group();
  plane.add(lanes);
  scene.add(plane);

  const css = getComputedStyle(document.documentElement);
  const color = (v: string) => new Color(css.getPropertyValue(v).trim());
  const COLOR: Record<Lane, Color> = {
    m: color('--ink'),
    u: color('--lane-u'),
    y: color('--lane-y'),
    t: color('--lane-t'),
  };
  const WHITE = new Color('#ffffff');
  const HAIR = WHITE.clone().lerp(COLOR.m, 0.14);

  let layout: Layout | null = null;
  let pivot = { x: 0, y: 0 };
  let strokes: { line: Line2; ys: Float32Array; segments: number }[] = [];
  let nodes: { group: Group; node: RailNode; materials: MeshBasicMaterial[] }[] = [];
  let labelNodes: { el: HTMLElement; node: RailNode }[] = [];
  let lineMaterials: LineMaterial[] = [];
  let size = '';

  function clear() {
    for (const obj of [...lanes.children, ...plane.children.filter((c) => c !== lanes)]) {
      obj.removeFromParent();
      obj.traverse((o) => {
        if (o instanceof Mesh || o instanceof Line2) o.geometry.dispose();
      });
    }
    nodes.forEach((n) => n.materials.forEach((m) => m.dispose()));
    lineMaterials.forEach((m) => m.dispose());
    strokes = [];
    nodes = [];
    labelNodes = [];
    lineMaterials = [];
  }

  function setLayout(next: Layout, g: RailGeometry) {
    clear();
    layout = next;
    if (!next.overture) return;
    pivot = next.overture.pivot;
    const width = parseFloat(css.getPropertyValue('--sw')) || 6;
    const material = (c: Color, w: number) => {
      const m = new LineMaterial({ color: c, linewidth: w, worldUnits: true, depthTest: false });
      lineMaterials.push(m);
      return m;
    };
    const hair = material(HAIR, 1.5);
    const lane: Record<Lane, LineMaterial> = {
      m: material(COLOR.m, width),
      u: material(COLOR.u, width),
      y: material(COLOR.y, width),
      t: material(COLOR.t, width),
    };

    let order = 0;
    /* Hairlines under every stroke, strokes in rail order, nodes last: the SVG's stacking. */
    const tracks = next.paths.map((p) => {
      const pos = new Float32Array(p.xs.length * 3);
      p.xs.forEach((x, i) => {
        pos[i * 3] = x - pivot.x;
        pos[i * 3 + 1] = -(p.ys[i] - pivot.y);
      });
      return { p, pos };
    });
    for (const { pos } of tracks) {
      const geo = new LineGeometry();
      geo.setPositions(pos);
      const line = new Line2(geo, hair);
      line.renderOrder = order++;
      lanes.add(line);
    }
    for (const { p, pos } of tracks) {
      const geo = new LineGeometry();
      geo.setPositions(pos);
      const line = new Line2(geo, lane[p.lane]);
      line.renderOrder = order++;
      lanes.add(line);
      strokes.push({ line, ys: p.ys, segments: p.xs.length - 1 });
    }

    for (const n of next.nodes) {
      const group = new Group();
      const materials: MeshBasicMaterial[] = [];
      const disc = (r: number, c: Color) => {
        const m = new MeshBasicMaterial({ color: c, transparent: true, depthTest: false });
        materials.push(m);
        const mesh = new Mesh(new CircleGeometry(r, 32), m);
        mesh.renderOrder = order++;
        group.add(mesh);
      };
      if (n.size === 'fork') disc(g.fork, COLOR.m);
      else {
        const r = n.size === 'big' ? g.R : g.r;
        const ring = n.size === 'big' ? g.ringR : g.ring;
        if (n.hollow) {
          disc(r + ring + 1.5, WHITE);
          disc(r + ring / 2, COLOR[n.lane]);
          disc(r - ring / 2, WHITE);
        } else {
          disc(r + ring, WHITE);
          disc(r, COLOR[n.lane]);
        }
      }
      plane.add(group);
      nodes.push({ group, node: n, materials });
      const label = n.size === 'commit' ? labels.get(n.lane) : undefined;
      if (label) labelNodes.push({ el: label, node: n });
    }
  }

  function render(state: OvertureState | null, view: Viewport) {
    const visible = !!state && !!layout?.overture && state.canvas > 0;
    stage.style.visibility = visible ? 'visible' : 'hidden';
    if (!visible || !state) return;
    stage.style.opacity = String(state.canvas);

    const key = `${view.width}x${view.height}`;
    if (key !== size) {
      size = key;
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.setSize(view.width, view.height, false);
      lineMaterials.forEach((m) => m.resolution.set(view.width, view.height));
    }
    fitCamera(camera, view);
    poseGraph(plane, lanes, state);

    /* The colour retracts to `limit`: history below it shows only as the hairline. */
    for (const s of strokes) {
      const n = Math.min(s.segments, segmentsAbove(s.ys, state.limit));
      s.line.geometry.instanceCount = n;
      s.line.visible = n > 0;
    }
    const window_ = TIMELINE.nodeWindow * view.height;
    for (const { group, node, materials } of nodes) {
      const t = ease(normalize(state.limit, node.y, node.y + window_));
      group.position.set((node.x - pivot.x) * state.spread * state.scale, -(node.y - pivot.y) * state.scale, 0);
      group.scale.setScalar(0.6 + 0.4 * t);
      group.visible = t > 0;
      materials.forEach((m) => (m.opacity = t));
    }
    renderer.render(scene, camera);

    for (const { el, node } of labelNodes) {
      const p = projectRailPoint(state, view, pivot, node);
      el.style.opacity = String(state.labels);
      el.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
    }
  }

  return { setLayout, render };
}
