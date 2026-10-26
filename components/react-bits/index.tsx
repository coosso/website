'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { useEffects } from '@/components/site/effects-provider';
import { cn } from '@/lib/cn';
import NativeAnimatedContent from './vendor/AnimatedContent';
import NativeBlurText from './vendor/BlurText';
import NativeCountUp from './vendor/CountUp';
import NativeDecryptedText from './vendor/DecryptedText';
import NativeLogoLoop from './vendor/LogoLoop';
import NativeMagnet from './vendor/Magnet';
import NativeRotatingText from './vendor/RotatingText';
import NativeScrollReveal from './vendor/ScrollReveal';
import NativeShinyText from './vendor/ShinyText';
import NativeSpotlightCard from './vendor/SpotlightCard';
import NativeStarBorder from './vendor/StarBorder';
import NativeTiltedCard from './vendor/TiltedCard';

// Browser-only WebGL modules are split from text and interactive controls.
const Aurora = dynamic(() => import('./vendor/Aurora'), { ssr: false });
const Threads = dynamic(() => import('./vendor/Threads'), { ssr: false });
type ContentProps = { children: ReactNode; className?: string };

export function AnimatedContent({ children, className, delay = 0 }: ContentProps & { delay?: number }) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <div className={className}>{children}</div>;
  return <NativeAnimatedContent className={className} delay={delay} distance={24} blur={3} duration={0.7} threshold={0.06}>{children}</NativeAnimatedContent>;
}

export function BlurText({ text, className, animateBy = 'letters' }: { text: string; className?: string; animateBy?: 'words' | 'letters' }) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <span className={className}>{text}</span>;
  return <NativeBlurText text={text} className={cn('site-blur-text', className)} animateBy={animateBy} delay={45} stepDuration={0.25} distance={14} blur={7} />;
}

export function DecryptedText({ text, className }: { text: string; className?: string }) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <span className={className}>{text}</span>;
  return <NativeDecryptedText text={text} parentClassName={className} animateOn="inViewHover" sequential speed={45} maxIterations={6} characters="01<>/{}:_+" scrambleColor="#ff783b" />;
}

export function ShinyText({ text, children, className }: { text?: string; children?: ReactNode; className?: string }) {
  const { hydrated, disabled } = useEffects();
  const { resolvedTheme } = useTheme();
  if (!hydrated || disabled) return <span className={className}>{text ?? children}</span>;
  return <NativeShinyText text={text} className={className} color={resolvedTheme === 'light' ? '#25231f' : '#f0ede6'} shineColor="#ff8c51" speed={3.5} delay={2} trigger="view">{children}</NativeShinyText>;
}

export function RotatingText({ texts, className }: { texts: string[]; className?: string }) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <span className={className}>{texts[0]}</span>;
  return <NativeRotatingText texts={texts} mainClassName={cn('inline-flex overflow-hidden', className)} staggerDuration={0.025} rotationInterval={3400} effect="blur" splitBy="characters" auto={!disabled} />;
}

export function CountUp({ to }: { to: number }) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <span className="tabular-nums">{to}</span>;
  return <span className="tabular-nums"><span className="sr-only">{to}</span><span aria-hidden="true"><NativeCountUp to={to} duration={1.6} /></span></span>;
}

export function SpotlightCard({ children, className }: ContentProps) {
  const { hydrated, disabled } = useEffects();
  const { resolvedTheme } = useTheme();
  if (!hydrated || disabled) return <div className={cn('site-spotlight', className)}>{children}</div>;
  return <NativeSpotlightCard className={cn('site-spotlight', className)} spotlightColor="#ff783b" intensity={0.1} borderGlow={0.5} spotlightSize={320} proximity={32} theme={resolvedTheme === 'light' ? 'light' : 'dark'}>{children}</NativeSpotlightCard>;
}

export function TiltedCard({ children, className }: ContentProps) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <div className={cn('site-tilted', className)}>{children}</div>;
  return <NativeTiltedCard className={cn('site-tilted', className)} containerWidth="100%" containerHeight="auto" imageWidth="100%" imageHeight="auto" rotateAmplitude={5} scaleOnHover={1.015} radius={24} glare={0.12} glareColor="#ff783b" showTooltip={false} intro={false}>{children}</NativeTiltedCard>;
}

export function Magnet({ children, className }: ContentProps) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <div className={cn('inline-flex', className)}>{children}</div>;
  return <NativeMagnet wrapperClassName={cn('inline-flex', className)} magnetStrength={6} padding={12} maxOffset={5}>{children}</NativeMagnet>;
}

export function StarBorder({ children, className }: ContentProps) {
  const { hydrated, disabled } = useEffects();
  const { resolvedTheme } = useTheme();
  if (!hydrated || disabled) return <div className={cn('site-star-border', className)}>{children}</div>;
  return <NativeStarBorder as="div" className={cn('site-star-border', className)} color="#ff783b" trailColor="#a9340d" duration={5} radius={100} theme={resolvedTheme === 'light' ? 'light' : 'dark'} backgroundColor="var(--site-surface)" textColor="var(--site-ink)" borderColor="var(--site-line)">{children}</NativeStarBorder>;
}

export function LogoLoop({ items }: { items: string[] }) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <div className="site-logo-fallback">{items.map(item => <span key={item}>{item}</span>)}</div>;
  return <NativeLogoLoop className="site-logo-loop" logos={items.map(item => ({ node: <span className="site-logo-item"><span aria-hidden="true">✳</span>{item}</span>, ariaLabel: item }))} logoHeight={28} speed={34} gap={56} fadeOut fadeOutColor="var(--site-bg)" pauseOnHover ariaLabel="技术工具" />;
}

export function ScrollReveal({ children, className }: { children: string; className?: string }) {
  const { hydrated, disabled } = useEffects();
  if (!hydrated || disabled) return <p className={className}>{children}</p>;
  return <NativeScrollReveal containerClassName={cn('site-scroll-reveal', className)} textClassName="site-scroll-reveal-text" baseOpacity={0.25} baseRotation={0} blurStrength={3} splitBy="chars" highlightColor="#ff783b">{children}</NativeScrollReveal>;
}

export function AuroraBackground({ className, interactive = false }: { className?: string; interactive?: boolean }) {
  const { hydrated, disabled } = useEffects();
  const { resolvedTheme } = useTheme();
  return <div aria-hidden="true" className={cn('site-effect-background site-aurora-background', className)}>{hydrated && !disabled && <Aurora colorStops={['#ff5c23', '#ff9c4b', '#6b2519']} amplitude={interactive ? 1.05 : 0.8} speed={0.38} height={interactive ? 0.66 : 0.52} scale={1.1} blend={0.7} layers={2} opacity={0.6} dpr={1} mouseInteraction={interactive} intro={false} lightMode={resolvedTheme === 'light'} />}</div>;
}

export function ThreadsBackground({ className }: { className?: string }) {
  const { hydrated, disabled } = useEffects();
  return <div aria-hidden="true" className={cn('site-effect-background site-threads-background', className)}>{hydrated && !disabled && <Threads color="#b1431b" accentColor="#ff8c51" lineCount={44} amplitude={1.5} distance={0.25} opacity={0.55} speed={0.3} enableMouseInteraction={false} />}</div>;
}
