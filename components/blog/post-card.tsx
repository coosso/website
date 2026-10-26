import Link from 'next/link';
import type { BlogPost } from '@/lib/source';
import { cn } from '@/lib/cn';
import { SpotlightCard } from '@/components/react-bits';
import { FeatureArt } from './feature-art';
import { formatDate, TagPill } from './shared';

export function PostCard({ post, className, index = 0 }: { post: BlogPost; className?: string; index?: number }) {
  return (
    <SpotlightCard className={cn('blog-post-card', className)}>
      <FeatureArt variant={index + 1} className="blog-post-art" />
      <div className="blog-post-card-content">
        <div className="blog-post-meta"><time dateTime={post.data.date}>{formatDate(post.data.date)}</time><span aria-hidden="true">↗</span></div>
        <h3><Link className="blog-card-title-link" href={post.url}>{post.data.title}</Link></h3>
        <p>{post.data.description}</p>
        <div className="blog-card-tags">{post.data.tags?.map((tag) => <TagPill key={tag} tag={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} />)}</div>
        {post.data.author && <span className="blog-card-author">{post.data.author}</span>}
      </div>
    </SpotlightCard>
  );
}
