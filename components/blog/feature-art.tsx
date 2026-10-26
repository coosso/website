import { cn } from '@/lib/cn';

/** Code-native artwork: no external images, content or loading dependencies. */
export function FeatureArt({ variant = 0, className }: { variant?: number; className?: string }) {
  return (
    <div className={cn('blog-art', `blog-art--${variant % 3}`, className)} aria-hidden="true">
      <div className="blog-art-grid" />
      <div className="blog-art-orbit blog-art-orbit--one" />
      <div className="blog-art-orbit blog-art-orbit--two" />
      <div className="blog-art-core" />
      <svg className="blog-art-wave" viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMidYMid slice">
        {[0, 1, 2, 3, 4, 5, 6].map((line) => (
          <path key={line} d={`M-60 ${260 + line * 15} C100 ${-100 + line * 23}, 320 ${520 - line * 15}, 660 ${80 + line * 24}`} stroke="currentColor" strokeWidth={line === 3 ? 2 : 0.8} opacity={0.2 + line * 0.08} />
        ))}
      </svg>
      <span className="blog-art-coordinate">FIELD NOTES / {String(variant + 1).padStart(2, '0')}</span>
      <span className="blog-art-cross">+</span>
    </div>
  );
}
