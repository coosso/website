import Link from 'next/link';
import type { BlogPost } from '@/lib/source';
import { AnimatedContent, ShinyText, SpotlightCard } from '@/components/react-bits';
import { FeatureArt } from './feature-art';
import { formatDate, TagPill } from './shared';

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <AnimatedContent>
      <SpotlightCard className="blog-featured">
        <FeatureArt className="blog-featured-art" />
        <div className="blog-featured-content">
          <div className="site-eyebrow"><ShinyText text="精选文章 / EDITOR'S PICK" /></div>
          <h2><Link className="blog-card-title-link" href={post.url}>{post.data.title}</Link></h2>
          <p>{post.data.description}</p>
          <div className="blog-card-tags">{post.data.tags?.map((tag) => <TagPill key={tag} tag={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} />)}</div>
          <div className="blog-featured-bottom"><div className="blog-post-meta">{post.data.author && <span>{post.data.author}</span>}<time dateTime={post.data.date}>{formatDate(post.data.date)}</time></div><span className="blog-read-arrow" aria-hidden="true">↗</span></div>
        </div>
      </SpotlightCard>
    </AnimatedContent>
  );
}
