import type { Metadata } from 'next';
import { FeaturedPost } from '@/components/blog/featured-post';
import { ListingHeader } from '@/components/blog/listing-header';
import { PostGrid } from '@/components/blog/post-grid';
import { getBlogPosts, getBlogTags } from '@/lib/source';
import '@/components/site/blog.css';

export const metadata: Metadata = { title: '博客', description: '记录技术探索、项目实践，以及那些值得留下的想法。' };

export default function BlogPage() {
  const posts = getBlogPosts();
  const heroPost = posts.find((post) => post.data.top) ?? posts[0];
  const rest = posts.filter((post) => post !== heroPost);
  return (
    <div className="blog-page">
      <ListingHeader tags={getBlogTags()} count={posts.length} />
      <div className="site-container">
        {heroPost && <section className="blog-featured-section" aria-label="精选文章"><FeaturedPost post={heroPost} /></section>}
        {(rest.length > 0 || !heroPost) && <section className="site-section blog-archive" aria-labelledby="blog-archive-heading"><div className="blog-section-heading"><div><span className="site-eyebrow">THE ARCHIVE</span><h2 id="blog-archive-heading">继续阅读</h2></div><span className="blog-section-count">{rest.length} 篇记录</span></div><PostGrid posts={rest} /></section>}
        <div className="blog-endnote"><span className="site-eyebrow">END OF ARCHIVE</span><span>共 {posts.length} 篇 · 每一次记录，都是下一步的起点。</span></div>
      </div>
    </div>
  );
}
