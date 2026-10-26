import { BlurText, DecryptedText, ThreadsBackground } from '@/components/react-bits';
import { TagPill } from './shared';

export function ListingHeader({ tags, activeTag, count }: { tags: string[]; activeTag?: string; count: number }) {
  return (
    <header className="blog-hero">
      <ThreadsBackground className="blog-hero-background" />
      <div className="site-container blog-hero-content">
        <div className="site-eyebrow"><DecryptedText text="JOURNAL / 思考与实践" /></div>
        <div className="blog-hero-heading-row">
          <div>
            <h1 className="blog-title"><BlurText text={activeTag ? `关于「${activeTag}」` : '把经验，写进下一次实践。'} /></h1>
            <p className="site-lead blog-hero-description">{activeTag ? '沿着一个主题，把零散的发现连成线。' : '记录技术探索、项目实践，以及那些值得留下的想法。'}</p>
          </div>
          <div className="blog-archive-count"><span>{String(count).padStart(2, '0')}</span><span>篇文章<br />持续记录中 ↗</span></div>
        </div>
        <nav className="blog-filters" aria-label="按文章标签筛选">
          <TagPill tag="全部文章" href="/blog" active={!activeTag} />
          {tags.map((tag) => <TagPill key={tag} tag={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} active={tag === activeTag} />)}
        </nav>
      </div>
    </header>
  );
}
