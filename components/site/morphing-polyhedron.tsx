'use client';

import { useEffect, useRef } from 'react';
import { useEffects } from './effects-provider';
import { createMorphMesh, getMorphState, morphPoint, SHAPES, type Vec3 } from './morph-geometry';
import { contourPath, createNebulaFrame } from './nebula-geometry';

const mesh = createMorphMesh();

function createFrame(seconds: number) {
  const state = getMorphState(seconds);
  const yaw = seconds * 0.19 + 0.35;
  const pitch = -0.18 + Math.sin(seconds * 0.16) * 0.14;
  const points = mesh.directions.map(direction => {
    const [x, y, z] = morphPoint(direction, state.from, state.to, state.progress);
    const rx = x * Math.cos(yaw) + z * Math.sin(yaw);
    const rz = -x * Math.sin(yaw) + z * Math.cos(yaw);
    return [rx, y * Math.cos(pitch) - rz * Math.sin(pitch), y * Math.sin(pitch) + rz * Math.cos(pitch)] as Vec3;
  });
  const projected = points.map(([x, y, z]) => {
    const scale = 145 * 4.5 / (4.5 - z);
    return { x: 240 + x * scale, y: 240 - y * scale, z };
  });
  const faces = mesh.faces.map(([a, b, c], index) => {
    const u = points[b].map((v, i) => v - points[a][i]);
    const v = points[c].map((value, i) => value - points[a][i]);
    const normal = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const length = Math.hypot(...normal) || 1;
    const light = Math.max(0, (-normal[0] * 0.4 + normal[1] * 0.6 + normal[2] * 0.7) / length);
    const front = normal[2] > 0;
    return {
      index,
      points: [a, b, c].map(i => `${projected[i].x.toFixed(2)},${projected[i].y.toFixed(2)}`).join(' '),
      depth: (points[a][2] + points[b][2] + points[c][2]) / 3,
      fill: front ? 0.06 + light * 0.34 : 0.012,
      stroke: front ? 0.22 + light * 0.52 : 0.08,
    };
  }).sort((a, b) => a.depth - b.depth);
  return { state, faces, points: projected, nebula: createNebulaFrame(projected, seconds) };
}

const initial = createFrame(0);

export function MorphingPolyhedron() {
  const { hydrated, disabled } = useEffects();
  const rootRef = useRef<HTMLDivElement>(null);
  const facesRef = useRef<SVGGElement>(null);
  const pointsRef = useRef<SVGGElement>(null);
  const nebulaRef = useRef<SVGGElement>(null);
  const hazeRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current, faceLayer = facesRef.current, pointLayer = pointsRef.current;
    const nebulaLayer = nebulaRef.current, haze = hazeRef.current;
    if (!root || !faceLayer || !pointLayer || !nebulaLayer || !haze) return;
    const polygons = new Map(Array.from(faceLayer.children).map(el => [Number(el.getAttribute('data-face')), el]));
    const dots = Array.from(pointLayer.children);
    const clouds = Array.from(nebulaLayer.children);
    const paint = () => {
      const frame = createFrame(clockRef.current);
      haze.setAttribute('d', contourPath(frame.nebula.layers[1].outline));
      frame.nebula.layers.forEach((layer, i) => {
        const cloud = clouds[i];
        const path = contourPath(layer.outline);
        cloud.children[0].setAttribute('d', path);
        cloud.children[1].setAttribute('d', path);
        cloud.children[1].setAttribute('stroke-dashoffset', String(layer.flowOffset));
        cloud.children[2].setAttribute('transform', `translate(${layer.star.x.toFixed(2)} ${layer.star.y.toFixed(2)})`);
      });
      for (const face of frame.faces) {
        const polygon = polygons.get(face.index)!;
        polygon.setAttribute('points', face.points);
        polygon.setAttribute('fill-opacity', String(face.fill));
        polygon.setAttribute('stroke-opacity', String(face.stroke));
      }
      // Painter's order makes the transparent facets read as one rotating 3D surface.
      frame.faces.forEach((face, i) => {
        const polygon = polygons.get(face.index)!;
        const current = faceLayer.children[i];
        if (current !== polygon) faceLayer.insertBefore(polygon, current ?? null);
      });
      dots.forEach((dot, i) => {
        const point = frame.points[i * 2];
        dot.setAttribute('cx', String(point.x));
        dot.setAttribute('cy', String(point.y));
        dot.setAttribute('opacity', String(point.z > 0 ? 0.75 : 0.12));
      });
      const shape = frame.state.progress > 0.5 ? frame.state.to : frame.state.from;
      root.dataset.shape = String(shape);
      root.dataset.morph = frame.state.progress > 0 && frame.state.progress < 1 ? 'transition' : 'hold';
      if (labelRef.current) labelRef.current.textContent = SHAPES[shape];
    };
    paint();
    if (!hydrated || disabled) return;

    let raf = 0, previous = 0, inView = true;
    const tick = (now: number) => {
      raf = 0;
      if (!inView || document.hidden) return;
      if (!previous || now - previous >= 1000 / 30) {
        if (previous) clockRef.current += Math.min((now - previous) / 1000, 0.1);
        previous = now;
        paint();
      }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      previous = 0;
      if (inView && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      wake();
    });
    observer.observe(root);
    document.addEventListener('visibilitychange', wake);
    wake();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', wake);
    };
  }, [hydrated, disabled]);

  return (
    <div ref={rootRef} className="home-orbit home-polyhedron" aria-hidden="true">
      <svg className="home-morph-mesh" viewBox="0 0 480 480" fill="none" focusable="false">
        <path ref={hazeRef} className="home-nebula-haze" d={contourPath(initial.nebula.layers[1].outline)} />
        <g ref={nebulaRef} className="home-nebula-layers">
          {initial.nebula.layers.map((layer, i) => (
            <g key={i} className={`home-nebula-layer home-nebula-layer-${i + 1}`}>
              <path className="home-nebula-outline" d={contourPath(layer.outline)} />
              <path className="home-nebula-stream" d={contourPath(layer.outline)} strokeDashoffset={layer.flowOffset} />
              <g className="home-nebula-star" transform={`translate(${layer.star.x.toFixed(2)} ${layer.star.y.toFixed(2)})`}>
                <circle className="home-nebula-star-halo" r="6" />
                <circle className="home-nebula-star-core" r={i === 1 ? 2.5 : 1.8} />
              </g>
            </g>
          ))}
        </g>
        <g ref={facesRef} fill="var(--site-orange)" stroke="var(--site-orange)" strokeWidth="0.65" strokeLinejoin="round">
          {initial.faces.map(face => <polygon key={face.index} data-face={face.index} points={face.points} fillOpacity={face.fill} strokeOpacity={face.stroke} />)}
        </g>
        <g ref={pointsRef} fill="var(--site-orange)">
          {initial.points.filter((_, i) => i % 2 === 0).map((point, i) => <circle key={i} cx={point.x} cy={point.y} r="1.5" opacity={point.z > 0 ? 0.75 : 0.12} />)}
        </g>
      </svg>
      <div className="home-orbit-caption">
        <span ref={labelRef}>{SHAPES[0]}</span>
        <span>形随思变，探索无限可能</span>
      </div>
    </div>
  );
}
