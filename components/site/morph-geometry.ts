export type Vec3 = [number, number, number];
export type Face = [number, number, number];

export const SHAPES = ['SPHERE / 球体', 'CUBE / 立方体', 'DIAMOND / 菱形体', 'TETRAHEDRON / 三角锥'] as const;
const tetrahedronNormals: Vec3[] = [[-1, -1, -1], [1, 1, -1], [1, -1, 1], [-1, 1, 1]];
const normalize = (v: Vec3): Vec3 => {
  const length = Math.hypot(...v);
  return v.map(value => value / length) as Vec3;
};

/** Symmetry tiles align with every target's face boundaries, preserving sharp edges. */
export function createMorphMesh() {
  const directions: Vec3[] = [];
  const faces: Face[] = [];
  const indices = new Map<string, number>();
  const subdivisions = 2;
  const permutations = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  for (const order of permutations) for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
    const vertex = (i: number, j: number) => {
      // One spherical tile is bounded by an axis, an edge diagonal and a body diagonal.
      const values = [subdivisions, subdivisions - i, subdivisions - i - j];
      const point: Vec3 = [sx * values[order[0]], sy * values[order[1]], sz * values[order[2]]];
      const key = point.join(',');
      let index = indices.get(key);
      if (index === undefined) {
        index = directions.length;
        indices.set(key, index);
        directions.push(normalize(point));
      }
      return index;
    };
    const face = (a: number, b: number, c: number) => {
      const p = directions[a], q = directions[b], r = directions[c];
      const u = q.map((v, i) => v - p[i]), v = r.map((value, i) => value - p[i]);
      const normal = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      faces.push(normal.reduce((sum, n, i) => sum + n * p[i], 0) > 0 ? [a, b, c] : [a, c, b]);
    };
    for (let i = 0; i < subdivisions; i++) for (let j = 0; j < subdivisions - i; j++) {
      face(vertex(i, j), vertex(i + 1, j), vertex(i, j + 1));
      if (i + j < subdivisions - 1) face(vertex(i + 1, j), vertex(i + 1, j + 1), vertex(i, j + 1));
    }
  }
  return { directions, faces };
}

export function pointOnShape(direction: Vec3, shape: number): Vec3 {
  let radius = 1;
  if (shape === 1) radius = 0.78 / Math.max(...direction.map(Math.abs));
  if (shape === 2) radius = 1.35 / direction.reduce((sum, v) => sum + Math.abs(v), 0);
  if (shape === 3) {
    const plane = Math.max(...tetrahedronNormals.map(n => n.reduce((sum, v, i) => sum + v * direction[i], 0) / Math.sqrt(3)));
    radius = 0.46 / plane;
  }
  return direction.map(v => v * radius) as Vec3;
}

export function morphPoint(direction: Vec3, from: number, to: number, progress: number): Vec3 {
  const a = pointOnShape(direction, from), b = pointOnShape(direction, to);
  return a.map((value, i) => value + (b[i] - value) * progress) as Vec3;
}

export function getMorphState(seconds: number) {
  const step = Math.max(0, seconds) / 5.2;
  const from = Math.floor(step) % SHAPES.length;
  const local = (step - Math.floor(step)) * 5.2;
  const t = Math.min(1, Math.max(0, (local - 1.6) / 2.8));
  return { from, to: (from + 1) % SHAPES.length, progress: t * t * t * (t * (t * 6 - 15) + 10) };
}
