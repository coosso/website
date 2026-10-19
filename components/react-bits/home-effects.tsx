'use client';

// Adapted from React Bits (David Haz). See LICENSE.md and README.md in this folder.
import { animate, useInView } from 'motion/react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';
import './home-effects.css';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reveal once, progressively enhanced so the server-rendered content stays readable without JS. */
export function AnimatedContent({
  children,
  className,
  delay = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & { delay?: number; }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = () => { node.dataset.visible = 'true'; };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    node.dataset.ready = 'true';
    observer.observe(node);
    media.addEventListener('change', reveal);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', reveal);
      delete node.dataset.ready;
      delete node.dataset.visible;
    };
  }, []);

  return (
    <div
      {...props}
      ref={ref}
      className={cn('rb-reveal', className)}
      style={{ '--rb-delay': `${delay}ms`, ...props.style } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Pointer-driven light and corner reticle; only CSS variables change during movement. */
export function SpotlightCard({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--rb-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--rb-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div {...props} className={cn('rb-spotlight', className)} onPointerMove={move}>
      <span className="rb-spotlight__light" aria-hidden="true" />
      <span className="rb-spotlight__reticle" aria-hidden="true">+</span>
      {children}
    </div>
  );
}

/** Keep the hit area stationary while the inner button follows a mouse by at most 5px. */
export function Magnet({ children, className }: { children: ReactNode; className?: string; }) {
  const inner = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || prefersReducedMotion() || !inner.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const clamp = (value: number) => Math.max(-5, Math.min(5, value));
    const x = clamp((event.clientX - rect.left - rect.width / 2) / 7);
    const y = clamp((event.clientY - rect.top - rect.height / 2) / 5);
    inner.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (inner.current) inner.current.style.transform = '';
  };

  return (
    <div className={cn('rb-magnet', className)} onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
      <div ref={inner} className="rb-magnet__inner">{children}</div>
    </div>
  );
}

/** Actual numbers are server rendered; the animated duplicate does not announce every frame. */
export function CountUp({ to }: { to: number; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const output = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const node = output.current;
    if (!node || !isInView || prefersReducedMotion()) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => { node.textContent = Math.round(value).toString(); },
    });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => {
      controls.stop();
      node.textContent = to.toString();
    };
    media.addEventListener('change', finish);
    return () => {
      finish();
      media.removeEventListener('change', finish);
    };
  }, [isInView, to]);

  return (
    <span ref={ref} className="rb-count tabular-nums">
      <span className="invisible" aria-hidden="true">{to}</span>
      <span ref={output} className="absolute inset-0" aria-hidden="true">{to}</span>
      <span className="sr-only">{to}</span>
    </span>
  );
}

/** Centre-out decryption on arrival and hover, with fixed glyph widths to avoid layout shift. */
export function DecryptedText({ text }: { text: string; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [display, setDisplay] = useState(text);
  const displayedChars = Array.from(display);

  const stop = useCallback(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (prefersReducedMotion() || timer.current !== null) return;
    const chars = Array.from(text);
    const glyphs = '01<>/{}:_';
    const middle = (chars.length - 1) / 2;
    let tick = 0;
    timer.current = setInterval(() => {
      tick += 1;
      if (tick >= 16) {
        stop();
        setDisplay(text);
        return;
      }
      setDisplay(chars.map((char, index) => {
        const revealAt = 4 + Math.abs(index - middle) * 3;
        return /\s/.test(char) || tick >= revealAt
          ? char
          : glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join(''));
    }, 45);
  }, [text, stop]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        play();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => { stop(); setDisplay(text); };
    observer.observe(node);
    media.addEventListener('change', finish);
    return () => {
      observer.disconnect();
      stop();
      media.removeEventListener('change', finish);
    };
  }, [play, stop, text]);

  return (
    <span ref={ref} className="rb-decrypted" onPointerEnter={(event) => {
      if (event.pointerType === 'mouse') play();
    }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span key={index} className="rb-decrypted__cell">
            <span className="invisible">{char}</span>
            <span className={cn('rb-decrypted__glyph', displayedChars[index] !== char && 'rb-decrypted__glyph--scrambled')}>
              {displayedChars[index] ?? char}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

export function ShinyText({ children }: { children: ReactNode; }) {
  return <span className="rb-shiny-text">{children}</span>;
}
