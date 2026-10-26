'use client';

import { useEffect, useRef } from 'react';

export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const resize = new ResizeObserver(onScroll);
    resize.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return <div ref={ref} aria-hidden="true" className="site-reading-progress" />;
}
