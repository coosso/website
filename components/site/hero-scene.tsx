'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from 'react';
import { AuroraBackground } from '@/components/react-bits';
import ClickSpark, { type ClickSparkHandle } from '@/components/react-bits/vendor/ClickSpark';
import { useEffects } from './effects-provider';

const Particles = dynamic(() => import('@/components/react-bits/vendor/Particles'), { ssr: false });
const finePointerQuery = '(hover: hover) and (pointer: fine)';
const subscribePointer = (listener: () => void) => {
  const query = window.matchMedia(finePointerQuery);
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
};
const getFinePointer = () => window.matchMedia(finePointerQuery).matches;
const getServerPointer = () => false;
// Deterministic CSS motes preserve the scene when a browser cannot compile WebGL shaders.
const dustPositions = [[8, 21], [18, 78], [31, 14], [39, 65], [48, 37], [54, 82], [61, 18], [66, 58], [71, 32], [75, 77], [81, 12], [85, 47], [89, 69], [94, 24], [97, 84], [57, 51], [69, 91], [91, 40]];

/** Keeps server-rendered Hero content intact while its decorative layers share pointer input. */
export function HeroScene({ children }: { children: ReactNode }) {
  const { hydrated, disabled } = useEffects();
  const { resolvedTheme } = useTheme();
  const finePointer = useSyncExternalStore(subscribePointer, getFinePointer, getServerPointer);
  const active = hydrated && !disabled;
  const interactive = active && finePointer;
  const sceneRef = useRef<HTMLElement>(null);
  const sparkRef = useRef<ClickSparkHandle>(null);
  const frameRef = useRef(0);

  const resetPointer = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    const scene = sceneRef.current;
    if (!scene) return;
    scene.dataset.pointer = 'idle';
    scene.style.setProperty('--hero-shift-x', '0px');
    scene.style.setProperty('--hero-shift-y', '0px');
    scene.style.setProperty('--hero-tilt-x', '0deg');
    scene.style.setProperty('--hero-tilt-y', '0deg');
  };

  useEffect(() => {
    // Scroll/blur must release the last pointer position even without a pointerleave event.
    window.addEventListener('scroll', resetPointer, { passive: true });
    window.addEventListener('blur', resetPointer);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('scroll', resetPointer);
      window.removeEventListener('blur', resetPointer);
    };
  }, []);

  useEffect(() => {
    if (!interactive) resetPointer();
  }, [interactive]);

  const movePointer = (event: PointerEvent<HTMLElement>) => {
    if (!interactive || event.pointerType !== 'mouse') return;
    const scene = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      const x = Math.min(rect.width, Math.max(0, clientX - rect.left));
      const y = Math.min(rect.height, Math.max(0, clientY - rect.top));
      const nx = x / Math.max(1, rect.width) - 0.5;
      const ny = y / Math.max(1, rect.height) - 0.5;
      scene.dataset.pointer = 'active';
      scene.style.setProperty('--hero-pointer-x', `${x}px`);
      scene.style.setProperty('--hero-pointer-y', `${y}px`);
      scene.style.setProperty('--hero-shift-x', `${nx * 38}px`);
      scene.style.setProperty('--hero-shift-y', `${ny * 30}px`);
      scene.style.setProperty('--hero-tilt-x', `${-ny * 8}deg`);
      scene.style.setProperty('--hero-tilt-y', `${nx * 10}deg`);
    });
  };

  const burst = (event: PointerEvent<HTMLElement>) => {
    if (!interactive || event.pointerType !== 'mouse' || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    sparkRef.current?.spark(event.clientX - rect.left, event.clientY - rect.top);
  };

  return (
    <section ref={sceneRef} className="home-hero" aria-labelledby="home-title"
      data-interactive={interactive ? 'true' : 'false'}
      onPointerMove={movePointer} onPointerLeave={resetPointer} onPointerCancel={resetPointer} onPointerDown={burst}>
      <AuroraBackground className="home-aurora" interactive={interactive} />
      <div className="home-hero-nebula" aria-hidden="true" />
      <div className="home-hero-particles" aria-hidden="true">
        {active && <Particles particleCount={finePointer ? 260 : 80} particleSpread={8} cameraDistance={22}
          particleColors={['#ff8549', '#ffbe82', '#f1e7d7']} particleBaseSize={finePointer ? 75 : 55}
          speed={0.055} pixelRatio={1} glow={0.65} twinkle={0.35} depthOfField={0.25}
          moveParticlesOnHover={interactive} hoverEffect="repel" hoverRadius={155} particleHoverFactor={1.6}
          clickBurst={interactive} intro={false} opacity={0.78} lightMode={resolvedTheme === 'light'} />}
        <div className="home-hero-dust">
          {dustPositions.map(([x, y], i) => <i key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${7 + i % 5}s` }} />)}
        </div>
      </div>
      <div className="home-hero-pointer-glow" aria-hidden="true" />
      <div className="home-hero-cursor" aria-hidden="true"><span /></div>
      <ClickSpark ref={sparkRef} disabled={!interactive} className="home-hero-sparks"
        sparkColor={['#ff8549', '#ffd7a1', '#fff4df']} sparkCount={12} sparkSize={18}
        sparkRadius={90} duration={680} shape="streak" glow={0.85} ring />
      {children}
    </section>
  );
}
