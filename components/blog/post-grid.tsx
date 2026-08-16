import type { BlogPost } from '@/lib/blog';
import { cn } from '@/lib/cn';
import { PostCard } from './post-card';

/** 虚线分隔的几何网格：桌面端 3 列，移动端纵向堆叠。 */
export function PostGrid({ posts }: { posts: BlogPost[] }) {
  const rows: BlogPost[][] = [];
  for (let i = 0; i < posts.length; i += 3) {
    rows.push(posts.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col">
      {rows.map((row, rowIndex) => (
        <div className="grid md:grid-cols-3" key={rowIndex}>
          {row.map((post, index) => (
            <PostCard
              className={cn(
                'border-b border-dashed border-neutral-300 last:border-b-0 dark:border-neutral-700 md:border-b-0',
                'md:border-l',
                index === 0 && 'md:border-l-0',
              )}
              key={post.url}
              post={post}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
