import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createMorphMesh, pointOnShape, morphPoint, getMorphState } from './morph-geometry.ts';

test('shared triangular mesh forms a closed surface without degenerate faces', () => {
  const { directions, faces } = createMorphMesh();
  assert.equal(faces.length, 192);
  const edges = new Map();
  for (const face of faces) {
    assert.equal(new Set(face).size, 3);
    for (let i = 0; i < 3; i++) {
      const edge = [face[i], face[(i + 1) % 3]].sort((a, b) => a - b).join(':');
      edges.set(edge, (edges.get(edge) ?? 0) + 1);
    }
  }
  assert.ok([...edges.values()].every(count => count === 2));
  assert.equal(directions.length - edges.size + faces.length, 2);
});

test('morph targets lie on the sphere, cube, diamond and tetrahedron surfaces', () => {
  const { directions } = createMorphMesh();
  for (const direction of directions) {
    const sphere = pointOnShape(direction, 0);
    assert.ok(Math.abs(Math.hypot(...sphere) - 1) < 1e-9);
    const cube = pointOnShape(direction, 1);
    assert.ok(Math.abs(Math.max(...cube.map(Math.abs)) - 0.78) < 1e-9);
    const diamond = pointOnShape(direction, 2);
    assert.ok(Math.abs(diamond.reduce((sum, v) => sum + Math.abs(v), 0) - 1.35) < 1e-9);
    const tetrahedron = pointOnShape(direction, 3);
    const planes = [[-1,-1,-1], [1,1,-1], [1,-1,1], [-1,1,1]];
    const maximum = Math.max(...planes.map(n => n.reduce((sum,v,i) => sum + v * tetrahedron[i], 0) / Math.sqrt(3)));
    assert.ok(Math.abs(maximum - 0.46) < 1e-9);
  }
});

test('interpolation preserves endpoints and the repeating timeline has no jumps', () => {
  const direction = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
  for (let shape = 0; shape < 4; shape++) {
    const next = (shape + 1) % 4;
    assert.deepEqual(morphPoint(direction, shape, next, 0), pointOnShape(direction, shape));
    const end = morphPoint(direction, shape, next, 1);
    pointOnShape(direction, next).forEach((v,i) => assert.ok(Math.abs(v - end[i]) < 1e-9));
    const before = getMorphState((shape + 1) * 5.2 - 0.00001);
    const after = getMorphState((shape + 1) * 5.2 + 0.00001);
    const a = morphPoint(direction, before.from, before.to, before.progress);
    const b = morphPoint(direction, after.from, after.to, after.progress);
    assert.ok(Math.hypot(...a.map((v,i) => v - b[i])) < 0.0001);
  }
});

test('every polyhedron facet lies on one target plane without crossing a sharp edge', () => {
  const { directions, faces } = createMorphMesh();
  const cubePlanes = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  const diamondPlanes = [];
  for (const x of [-1,1]) for (const y of [-1,1]) for (const z of [-1,1]) diamondPlanes.push([x,y,z]);
  const tetrahedronPlanes = [[-1,-1,-1], [1,1,-1], [1,-1,1], [-1,1,1]].map(n => n.map(v => v / Math.sqrt(3)));
  for (const [shape, planes, distance] of [[1,cubePlanes,0.78], [2,diamondPlanes,1.35], [3,tetrahedronPlanes,0.46]]) {
    for (const face of faces) {
      const points = face.map(i => pointOnShape(directions[i], shape));
      assert.ok(planes.some(n => points.every(p => Math.abs(n.reduce((sum,v,i) => sum + v * p[i],0) - distance) < 1e-9)), `shape ${shape} has a facet crossing an edge`);
    }
  }
});
