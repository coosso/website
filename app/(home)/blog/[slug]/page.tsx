import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { BlurText, SpotlightCard } from '@/components/react-bits';
import { ReadingProgress } from '@/components/site/reading-progress';
import { PostGrid } from '@/components/blog/post-grid';
import { FeatureArt } from '@/components/blog/feature-art';
import { TagPill, formatDate } from '@/components/blog/shared';
import { blogSource, getBlogPost, getBlogPosts, type BlogPost } from '@/lib/source';
import '@/components/site/blog.css';

export function generateStaticParams() {
  return blogSource.generateParams().map((params) => ({ slug: params.slug[0] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.data.title, description: post.data.description };
}

function AdjacentPost({ post, direction }: { post: BlogPost; direction: 'prev' | 'next' }) {
  return <SpotlightCard className="blog-adjacent-card"><Link href={post.url}><span className="site-eyebrow">{direction === 'prev' ? '← 上一篇' : '下一篇 →'}</span><h3>{post.data.title}</h3><time className="blog-post-meta" dateTime={post.data.date}>{formatDate(post.data.date)}</time></Link></SpotlightCard>;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const MDX = post.data.body;
  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.url === post.url);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const explicitRelated = (post.data.related ?? [])
    .map((slug) => allPosts.find((p) => p.slugs[0] === slug || p.slugs[0] === encodeURIComponent(slug)))
    .filter((p): p is BlogPost => Boolean(p) && p?.url !== post.url);
  const sharedTopicPosts = allPosts.filter((candidate) => candidate.url !== post.url && candidate.data.tags?.some((tag) => post.data.tags?.includes(tag)));
  const relatedPosts = [...new Map([...explicitRelated, ...sharedTopicPosts].map((candidate) => [candidate.url, candidate])).values()].slice(0, 3);

  return (
    <article className="blog-page blog-article">
      <ReadingProgress />
      <header className="site-container blog-article-header">
        <Link href="/blog" className="blog-back-link">← 返回全部文章</Link>
        <div className="blog-article-kicker"><span className="site-eyebrow">JOURNAL / {post.data.tags?.[0] ?? '文章'}</span><time className="blog-post-meta" dateTime={post.data.date}>{formatDate(post.data.date)}</time></div>
        <h1><BlurText text={post.data.title} /></h1>
        <p className="blog-article-description">{post.data.description}</p>
        <div className="blog-article-meta">{post.data.author && <div className="blog-author"><span className="blog-author-avatar" aria-hidden="true">{post.data.author.charAt(0).toUpperCase()}</span><span>{post.data.author}</span></div>}<div className="blog-article-tags">{post.data.tags?.map((tag) => <TagPill key={tag} tag={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} />)}</div></div>
      </header>
      <div className="site-container"><FeatureArt variant={Math.max(0, currentIndex)} className="blog-article-banner" /></div>
      <div className="site-container blog-reading-layout">
        <aside className="blog-reading-aside" aria-label="文章信息"><div className="site-eyebrow">READ / 正文</div><span className="blog-reading-rule" /><p>从这里，<br />继续思考。</p><Link href="/blog" className="site-link">所有文章 ↗</Link></aside>
        <div className="blog-reading-main">
          <div className="prose blog-prose"><MDX components={getMDXComponents()} /></div>
          <div className="blog-article-end"><span className="blog-article-end-mark" aria-hidden="true">✳</span><span className="site-eyebrow">感谢阅读 / THANKS FOR READING</span><div className="blog-article-tags">{post.data.tags?.map((tag) => <TagPill key={tag} tag={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} />)}</div></div>
          {(prevPost || nextPost) && <nav className="blog-adjacent" aria-label="上一篇和下一篇">{prevPost && <AdjacentPost post={prevPost} direction="prev" />}{nextPost && <AdjacentPost post={nextPost} direction="next" />}</nav>}
        </div>
      </div>
      {relatedPosts.length > 0 && <section className="site-container site-section blog-related" aria-labelledby="blog-related-heading"><div className="blog-section-heading"><div><span className="site-eyebrow">KEEP EXPLORING</span><h2 id="blog-related-heading">延伸阅读</h2></div><Link href="/blog" className="site-link">全部文章 ↗</Link></div><PostGrid posts={relatedPosts} /></section>}
    </article>
  );
}
