import Link from 'next/link';
import { PostGrid } from '@/components/blog/post-grid';
import { Bracket, Corners, TagPill, formatDate } from '@/components/blog/shared';
import { getBlogPosts, getBlogTags, type BlogPost } from '@/lib/source';

/** 精选文章：几何索引面板 + 内容，四角橙色直角括号。 */
function HeroCard({ post }: { post: BlogPost }) {
  return (
    <div className="group relative border border-dashed border-neutral-300 dark:border-neutral-700">
      <Corners />
      <Link
        href={post.url}
        aria-label={post.data.title}
        className="absolute inset-0 z-0"
      />
      <div className="grid md:grid-cols-5">
        <div className="flex items-center justify-center border-b border-dashed border-neutral-300 py-5 md:col-span-2 md:border-b-0 md:border-r dark:border-neutral-700">
          <span className="font-mono text-3xl font-light text-cossistant-orange md:text-4xl">
            [<span className="px-2 text-neutral-300 dark:text-neutral-700">01</span>]
          </span>
        </div>
        <div className="flex flex-col gap-2.5 p-4 md:col-span-3 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Bracket>精选</Bracket>
            {post.data.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="relative z-10 border border-dashed border-neutral-300 px-2 py-0.5 font-mono text-[11px] text-neutral-500 transition-colors hover:border-cossistant-orange hover:text-cossistant-orange dark:border-neutral-700 dark:text-neutral-400"
              >
                {tag}
              </Link>
            ))}
          </div>
          <h2 className="text-balance text-xl font-bold tracking-tight transition-colors group-hover:text-cossistant-orange md:text-3xl">
            {post.data.title}
          </h2>
          <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
            {post.data.description}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {post.data.author}
            </span>
            <time
              className="font-mono text-sm text-neutral-500 dark:text-neutral-400"
              dateTime={post.data.date}
            >
              {formatDate(post.data.date)}
            </time>
            <span className="font-mono text-xs text-cossistant-orange">
              [ 阅读 → ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const posts = getBlogPosts();
  const heroPost = posts.find((post) => post.data.top) ?? posts[0];
  const rest = posts.filter((post) => post !== heroPost);
  const tags = getBlogTags();

  return (
    <div className="flex flex-col flex-1">
      {/* 页头：标题 + 标签筛选 */}
      <section className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="px-6 py-4 md:px-12 lg:px-24">
          <div className="mx-auto w-full max-w-4xl">
            <Bracket className="text-base md:text-lg lg:text-xl">Blog</Bracket>
            <div className="mt-3 flex flex-wrap gap-2">
              <TagPill tag="全部" href="/blog" active />
              {tags.map((tag) => (
                <TagPill
                  key={tag}
                  tag={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 精选文章 */}
      {heroPost && (
        <section className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
          <div className="px-6 py-6 md:px-12 md:py-8 lg:px-24">
            <div className="mx-auto w-full max-w-4xl">
              <HeroCard post={heroPost} />
            </div>
          </div>
        </section>
      )}

      {/* 全部文章网格 */}
      {rest.length > 0 && (
        <section className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
          <div className="px-6 py-6 md:px-12 lg:px-24">
              <div className="mx-auto w-full max-w-4xl">
            <Bracket>全部文章</Bracket>
            <div className="mt-5">
              <PostGrid posts={rest} />
            </div>
            </div>
          </div>
        </section>
      )}

      {/* 页脚计数 */}
      <section className="px-6 py-5 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-4xl">
          <Bracket>共 {posts.length} 篇</Bracket>
        </div>
      </section>
    </div>
  );
}
