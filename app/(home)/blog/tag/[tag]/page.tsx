import type { Metadata } from 'next';
import { ListingHeader } from '@/components/blog/listing-header';
import { PostGrid } from '@/components/blog/post-grid';
import { getBlogPosts, getBlogTags } from '@/lib/source';
import '@/components/site/blog.css';

function decodeTag(value: string): string {
  if (getBlogTags().includes(value)) return value;
  try { return decodeURIComponent(value); } catch { return value; }
}

export function generateStaticParams() { return getBlogTags().map((tag) => ({ tag })); }

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeTag(tag);
  return { title: `标签：${decoded}`, description: `关于「${decoded}」的文章合集。` };
}

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeTag(rawTag);
  const posts = getBlogPosts().filter((post) => post.data.tags?.includes(tag));
  return (
    <div className="blog-page">
      <ListingHeader tags={getBlogTags()} activeTag={tag} count={posts.length} />
      <section className="site-container site-section blog-archive" aria-labelledby="blog-tag-heading"><div className="blog-section-heading"><div><span className="site-eyebrow">SELECTED TOPIC</span><h2 id="blog-tag-heading">{tag}</h2></div><span className="blog-section-count">{posts.length} 篇记录</span></div><PostGrid posts={posts} /></section>
    </div>
  );
}
