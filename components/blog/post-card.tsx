import Link from 'next/link';
import type { BlogPost } from '@/lib/source';
import { cn } from '@/lib/cn';
import { formatDate } from './shared';

/** 网格卡片：标题、摘要、作者与日期，悬停时出现橙色 `[→]`。标签可点击跳转标签页。 */
export function PostCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col gap-2 p-4 transition-colors hover:bg-neutral-50 md:p-5 dark:hover:bg-neutral-900/60',
        className,
      )}
    >
      <Link
        href={post.url}
        aria-label={post.data.title}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {post.data.tags?.slice(0, 3).map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${encodeURIComponent(tag)}`}
            className="border border-dashed rounded-xs border-neutral-300 px-2 py-0.5 font-mono text-[11px] text-neutral-500 transition-colors hover:border-cossistant-orange hover:text-cossistant-orange dark:border-neutral-700 dark:text-neutral-400"
          >
            {tag}
          </Link>
        ))}
      </div>

      <h3 className="font-medium text-lg leading-snug tracking-tight transition-colors group-hover:text-cossistant-orange md:text-xl">
        {post.data.title}
      </h3>

      <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {post.data.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {post.data.author}
        </span>
        <span className="flex items-center gap-3">
          <time
            className="font-mono text-xs text-neutral-500 dark:text-neutral-400"
            dateTime={post.data.date}
          >
            {formatDate(post.data.date)}
          </time>
          <span className="font-mono text-xs text-cossistant-orange opacity-0 transition-opacity group-hover:opacity-100">
            [→]
          </span>
        </span>
      </div>
    </div>
  );
}
