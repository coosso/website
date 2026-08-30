import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** 将 "YYYY-MM-DD" 格式化为 "YYYY.MM.DD"，避免时区偏移。 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${y}.${m}.${d}`;
}

/** 站点的签名式标注：橙色 `[ 内容 ]`。 */
export function Bracket({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-baseline gap-[0.38em] font-mono text-xs font-semibold tracking-[0.12em]', className)}>
      <span className="text-cossistant-orange">[</span>
      <span>{children}</span>
      <span className="text-cossistant-orange">]</span>
    </span>
  );
}

/** 虚线边框的标签胶囊，可作纯标签或链接。 */
export function TagPill({
  tag,
  href,
  active,
}: {
  tag: string;
  href?: string;
  active?: boolean;
}) {
  const className = cn(
    'border border-dashed border-neutral-300 px-2.5 py-1 font-mono text-xs',
    'text-neutral-600 transition-colors hover:border-cossistant-orange hover:text-cossistant-orange',
    'dark:border-neutral-700 dark:text-neutral-300',
    active &&
      'border-cossistant-orange text-cossistant-orange dark:border-cossistant-orange dark:text-cossistant-orange',
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {tag}
      </Link>
    );
  }

  return <span className={className}>{tag}</span>;
}

/** 四角的橙色直角括号，用于给卡片加上几何边框。 */
export function Corners({ className }: { className?: string }) {
  const base = 'pointer-events-none absolute size-4 border-cossistant-orange';
  return (
    <>
      <span
        aria-hidden
        className={cn(base, 'top-0 left-0 border-t-2 border-l-2', className)}
      />
      <span
        aria-hidden
        className={cn(base, 'top-0 right-0 border-t-2 border-r-2', className)}
      />
      <span
        aria-hidden
        className={cn(base, 'bottom-0 left-0 border-b-2 border-l-2', className)}
      />
      <span
        aria-hidden
        className={cn(base, 'bottom-0 right-0 border-b-2 border-r-2', className)}
      />
    </>
  );
}
