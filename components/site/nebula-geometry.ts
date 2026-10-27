export type Point = { x: number; y: number };

const cross = (a: Point, b: Point, c: Point) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

/** The outer cloud follows the visible silhouette, including perspective and rotation. */
export function convexHull(points: Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const unique = sorted.filter((p, i) => !i || p.x !== sorted[i - 1].x || p.y !== sorted[i - 1].y);
  if (unique.length < 3) return unique;
  const half = (list: Point[]) => {
    const result: Point[] = [];
    for (const point of list) {
      while (result.length >= 2 && cross(result[result.length - 2], result[result.length - 1], point) <= 0) result.pop();
      result.push(point);
    }
    return result;
  };
  const lower = half(unique);
  const upper = half([...unique].reverse());
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

function pointOnContour(contour: Point[], center: Point, angle: number): Point {
  const direction = { x: Math.cos(angle), y: Math.sin(angle) };
  for (let i = 0; i < contour.length; i++) {
    const a = contour[i], b = contour[(i + 1) % contour.length];
    const edge = { x: b.x - a.x, y: b.y - a.y };
    const delta = { x: a.x - center.x, y: a.y - center.y };
    const denominator = direction.x * edge.y - direction.y * edge.x;
    if (Math.abs(denominator) < 1e-10) continue;
    const distance = (delta.x * edge.y - delta.y * edge.x) / denominator;
    const along = (delta.x * direction.y - delta.y * direction.x) / denominator;
    if (distance >= 0 && along >= -1e-9 && along <= 1 + 1e-9) {
      return { x: center.x + direction.x * distance, y: center.y + direction.y * distance };
    }
  }
  return center;
}

const motions = [
  { scale: 1.12, speed: 0.32, phase: 0.4, flow: 16 },
  { scale: 1.25, speed: -0.22, phase: 2.4, flow: -11 },
  { scale: 1.39, speed: 0.15, phase: 4.3, flow: 7 },
];

export function createNebulaFrame(projected: Point[], seconds: number) {
  const hull = convexHull(projected);
  const divisor = hull.length || 1;
  let twiceArea = 0, weightedX = 0, weightedY = 0;
  for (let i = 0; i < hull.length; i++) {
    const a = hull[i], b = hull[(i + 1) % hull.length];
    const weight = a.x * b.y - b.x * a.y;
    twiceArea += weight;
    weightedX += (a.x + b.x) * weight;
    weightedY += (a.y + b.y) * weight;
  }
  const center = Math.abs(twiceArea) > 1e-9
    ? { x: weightedX / (3 * twiceArea), y: weightedY / (3 * twiceArea) }
    : { x: hull.reduce((sum, point) => sum + point.x, 0) / divisor, y: hull.reduce((sum, point) => sum + point.y, 0) / divisor };
  const layers = motions.map(({ scale: base, speed, phase, flow }, i) => {
    const scale = base * (1 + 0.007 * Math.sin(seconds * (0.28 + i * 0.11) + phase));
    const outline = hull.map(point => ({ x: center.x + (point.x - center.x) * scale, y: center.y + (point.y - center.y) * scale }));
    const angle = phase + seconds * speed;
    const star = pointOnContour(outline, center, angle);
    return { outline, scale, angle, star, flowOffset: seconds * flow };
  });
  return { center, hull, layers };
}

export function contourPath(points: Point[]): string {
  if (!points.length) return '';
  return `M ${points.map(point => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' L ')} Z`;
}
