import Link from 'next/link';
import type { BlogPost } from '@/lib/source';
import { AnimatedContent } from '@/components/react-bits';
import { PostCard } from './post-card';

export function PostGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <div className="blog-empty"><span className="blog-empty-symbol" aria-hidden="true">∅</span><h2>这里还没有文章</h2><p>换一个主题，继续探索已有的记录。</p><Link href="/blog" className="site-button-secondary">浏览全部文章 ↗</Link></div>;
  }
  return <div className="blog-post-grid">{posts.map((post, index) => <AnimatedContent key={post.url} delay={(index % 3) * 0.08}><PostCard post={post} index={index} /></AnimatedContent>)}</div>;
}
