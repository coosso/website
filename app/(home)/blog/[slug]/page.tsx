import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { Bracket, TagPill, formatDate } from '@/components/blog/shared';
import { blogSource, getBlogPosts, type BlogPost } from '@/lib/blog';

export function generateStaticParams() {
  return blogSource.generateParams().map((params) => ({
    slug: params.slug[0],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogSource.getPage([slug]);
  if (!post) return {};

  return {
    title: post.data.title,
    description: post.data.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogSource.getPage([slug]);
  if (!post) notFound();

  const MDX = post.data.body;
  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.url === post.url);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const relatedPosts = (post.data.related ?? [])
    .map((slug) => allPosts.find((p) => p.slugs[0] === slug))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, 3);

  return (
    <article className="flex flex-col flex-1">
      <div className="px-6 py-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-3xl">
          {/* 返回 */}
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center font-mono text-xs text-neutral-500 transition-colors hover:text-cossistant-orange dark:text-neutral-400"
          >
            <span className="text-cossistant-orange">[</span> ← 返回博客{' '}
            <span className="text-cossistant-orange">]</span>
          </Link>

          {/* 头部 */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.data.tags?.map((tag) => (
                <TagPill
                  key={tag}
                  tag={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                />
              ))}
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {post.data.title}
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              {post.data.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-dashed border-neutral-300 pt-4 dark:border-neutral-700">
              <span className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center border border-dashed border-cossistant-orange font-mono text-xs text-cossistant-orange">
                  {(post.data.author ?? '?').charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-medium">{post.data.author}</span>
              </span>
              <time
                className="font-mono text-sm text-neutral-500 dark:text-neutral-400"
                dateTime={post.data.date}
              >
                {formatDate(post.data.date)}
              </time>
            </div>
          </header>

          {/* 正文 */}
          <div className="prose max-w-none">
            <MDX components={getMDXComponents()} />
          </div>

          {/* 底部标签 */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-dashed border-neutral-300 pt-5 dark:border-neutral-700">
            <Bracket className="text-neutral-500 dark:text-neutral-400">标签</Bracket>
            {post.data.tags?.map((tag) => (
              <TagPill
                key={tag}
                tag={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
              />
            ))}
          </div>

          {/* 相关文章 */}
          {relatedPosts.length > 0 && (
            <section className="mt-10">
              <Bracket className="mb-5 inline-block">相关文章</Bracket>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.url}
                    href={related.url}
                    className="group flex flex-col gap-2 border border-dashed border-neutral-300 p-4 transition-colors hover:border-cossistant-orange dark:border-neutral-700"
                  >
                    <h3 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-cossistant-orange">
                      {related.data.title}
                    </h3>
                    <time
                      className="mt-auto font-mono text-xs text-neutral-500 dark:text-neutral-400"
                      dateTime={related.data.date}
                    >
                      {formatDate(related.data.date)}
                    </time>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 上一篇 / 下一篇 */}
          <nav className="mt-10 flex items-center justify-between gap-4 border-t border-dashed border-neutral-300 pt-5 dark:border-neutral-700">
            {prevPost ? (
              <Link
                href={prevPost.url}
                className="group flex min-w-0 items-center gap-2 font-mono text-xs text-neutral-600 transition-colors hover:text-cossistant-orange dark:text-neutral-300"
              >
                <span className="text-cossistant-orange">[</span> ← 上一篇
                <span className="text-cossistant-orange">]</span>
              </Link>
            ) : (
              <span />
            )}
            {nextPost ? (
              <Link
                href={nextPost.url}
                className="group flex min-w-0 items-center gap-2 font-mono text-xs text-neutral-600 transition-colors hover:text-cossistant-orange dark:text-neutral-300"
              >
                <span className="text-cossistant-orange">[</span> 下一篇 →
                <span className="text-cossistant-orange">]</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
