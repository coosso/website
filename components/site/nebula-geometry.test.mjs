import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createNebulaFrame, convexHull } from './nebula-geometry.ts';

const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }, { x: 5, y: 5 }];

test('silhouette ignores interior and duplicate points', () => {
  const hull = convexHull([...square, square[0]]);
  assert.equal(hull.length, 4);
  assert.deepEqual(new Set(hull.map(p => `${p.x},${p.y}`)), new Set(['0,0', '10,0', '10,10', '0,10']));
});

test('each outer contour follows and encloses the projected shape', () => {
  const frame = createNebulaFrame(square, 0);
  for (const layer of frame.layers) {
    assert.equal(layer.outline.length, frame.hull.length);
    for (let i = 0; i < frame.hull.length; i++) {
      assert.ok(Math.abs(layer.outline[i].x - (frame.center.x + (frame.hull[i].x - frame.center.x) * layer.scale)) < 1e-9);
      assert.ok(Math.abs(layer.outline[i].y - (frame.center.y + (frame.hull[i].y - frame.center.y) * layer.scale)) < 1e-9);
      assert.ok(layer.scale > 1);
    }
  }
  const triangle = createNebulaFrame([{ x: 1, y: 1 }, { x: 9, y: 1 }, { x: 5, y: 9 }], 0);
  assert.ok(triangle.layers.every(layer => layer.outline.length === 3));
});

test('cloud expansion is centered on polygon area, not on unevenly spaced vertices', () => {
  const frame = createNebulaFrame([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 8, y: 10 }, { x: 0, y: 10 }], 0);
  assert.ok(Math.abs(frame.center.x - 122 / 27) < 1e-9);
  assert.ok(Math.abs(frame.center.y - 130 / 27) < 1e-9);
});

test('stars move independently along their own contours without leaving them', () => {
  const first = createNebulaFrame(square, 0);
  const later = createNebulaFrame(square, 1);
  const angularDelta = first.layers.map((layer, i) => later.layers[i].angle - layer.angle);
  assert.ok(angularDelta.some(delta => delta > 0));
  assert.ok(angularDelta.some(delta => delta < 0));
  first.layers.forEach(layer => {
    const { x, y } = layer.star;
    const vertices = layer.outline;
    assert.ok(vertices.some((a, i) => {
      const b = vertices[(i + 1) % vertices.length];
      const cross = (x - a.x) * (b.y - a.y) - (y - a.y) * (b.x - a.x);
      const dot = (x - a.x) * (x - b.x) + (y - a.y) * (y - b.y);
      return Math.abs(cross) < 1e-7 && dot <= 1e-7;
    }));
  });
});
