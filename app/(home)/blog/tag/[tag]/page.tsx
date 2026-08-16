import type { Metadata } from 'next';
import { PostGrid } from '@/components/blog/post-grid';
import { Bracket, TagPill } from '@/components/blog/shared';
import { getBlogPosts, getBlogTags } from '@/lib/blog';

/** 动态路由参数可能是 URL 编码后的值，这里安全地解码一次。 */
function decodeTag(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function generateStaticParams() {
  return getBlogTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeTag(tag);
  return {
    title: `标签：${decoded}`,
    description: `关于「${decoded}」的文章合集。`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeTag(rawTag);
  const posts = getBlogPosts().filter((post) => post.data.tags?.includes(tag));
  const tags = getBlogTags();

  return (
    <div className="flex flex-col flex-1">
      {/* 页头：与博客页一致，仅当前标签高亮 */}
      <section className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="px-6 py-4 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            <Bracket>博客</Bracket>
            <p className="mt-2 max-w-lg text-neutral-600 dark:text-neutral-400">
              关于技术成长与 AI 工程实践的记录。业精于勤，行成于思。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <TagPill tag="全部" href="/blog" />
              {tags.map((t) => (
                <TagPill
                  key={t}
                  tag={t}
                  href={`/blog/tag/${encodeURIComponent(t)}`}
                  active={t === tag}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 相关文章网格 */}
      <section className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="px-6 py-6 md:px-12 lg:px-24">
          <Bracket>相关文章</Bracket>
          <div className="mt-5">
            <PostGrid posts={posts} />
          </div>
        </div>
      </section>

      {/* 页脚计数 */}
      <section className="px-6 py-5 md:px-12 lg:px-24">
        <Bracket>共 {posts.length} 篇</Bracket>
      </section>
    </div>
  );
}
