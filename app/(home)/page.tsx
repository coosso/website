import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Braces, Code2, Layers3, Terminal } from 'lucide-react';
import {
  AnimatedContent, BlurText, CountUp, DecryptedText, LogoLoop,
  Magnet, RotatingText, ScrollReveal, ShinyText, SpotlightCard, StarBorder, TiltedCard,
} from '@/components/react-bits';
import { getBlogPosts, notesSource } from '@/lib/source';
import { HeroScene } from '@/components/site/hero-scene';
import { MorphingPolyhedron } from '@/components/site/morphing-polyhedron';
import '@/components/site/home.css';

const TOOLCHAIN = ['Python', 'TypeScript', 'React', 'FastAPI', 'LangChain', 'Claude Code', 'Codex', 'Pi Agent', 'Hermes Agent'];

export default function HomePage() {
  const posts = getBlogPosts();
  const notes = notesSource.getPages();
  const [featuredPost, ...otherPosts] = posts.slice(0, 3);

  return (
    <div className="home-page">
      <HeroScene>
        <div className="site-container home-hero-inner">
          <div className="home-hero-copy">
            <p className="site-eyebrow home-hero-eyebrow">
              <span className="home-status-dot" aria-hidden="true" />
              <DecryptedText text="COOSSO / PERSONAL SPACE" />
            </p>
            <h1 id="home-title" className="home-title">
              <BlurText text="可塑性" />
              <span className="home-title-orange"><BlurText text="空间。" /></span>
            </h1>
            <div className="home-focus">
              <span className="home-focus-label">正在探索</span>
              <RotatingText texts={['AI 工程', '多智能体系统', '可靠的工具']} />
            </div>
            <p className="site-lead home-hero-description">
              写代码，做研究，记录那些让系统变得更可靠的细节。
              在思考与实践之间，让想法慢慢成形。
            </p>
            <div className="home-actions">
              <Magnet>
                <StarBorder className="home-primary-border">
                  <Link href="/blog" className="site-button">
                    阅读最新文章 <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </StarBorder>
              </Magnet>
              <Link href="/about" className="site-button-secondary">
                关于我 <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <MorphingPolyhedron />
          <div className="home-hero-baseline">
            <span><Braces size={15} aria-hidden="true" /> 从想法，到实现</span>
            <a href="#explore" className="home-scroll-link">向下探索 <ArrowDown size={14} aria-hidden="true" /></a>
            <span className="home-hero-coordinate">THINK. BUILD. REPEAT.</span>
          </div>
        </div>
      </HeroScene>

      <section id="explore" className="site-container site-section home-explore" aria-labelledby="explore-title">
        <AnimatedContent className="site-section-heading home-section-heading">
          <div>
            <p className="site-eyebrow"><DecryptedText text="01 / THE SPACE" /></p>
            <h2 id="explore-title" className="site-heading">思考有迹，探索无界。</h2>
          </div>
          <p className="site-muted">把值得复用的判断，<br />沉淀成下一次出发的起点。</p>
        </AnimatedContent>
        <div className="home-bento">
          <AnimatedContent className="home-identity-wrap" delay={0.06}>
            <TiltedCard className="home-identity-frame">
              <div className="home-identity">
              <div className="home-identity-top"><span className="home-card-kicker">BEHIND THE CODE</span><Code2 size={22} aria-hidden="true" /></div>
              <div className="home-monogram" aria-hidden="true">c<span>.</span></div>
              <div className="home-identity-bottom">
                <span className="home-identity-name">coosso</span>
                <p>全栈工程师<br />LLM 应用 / 多智能体</p>
                <Link href="/about" className="home-identity-link">认识一下 <ArrowUpRight size={19} aria-hidden="true" /></Link>
              </div>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent className="home-notes-wrap" delay={0.12}>
            <SpotlightCard className="home-notes-card">
              <div className="home-card-topline"><span className="home-card-kicker">KNOWLEDGE, CONNECTED.</span><BookOpen size={21} aria-hidden="true" /></div>
              <div className="home-notes-body">
                <div>
                  <h3>零散的灵感，<br />成体系的笔记。</h3>
                  <p>从 Agent 工程到日常开发，<br />收集问题，也记录解法。</p>
                  <Link href="/notes" className="home-notes-link">进入知识库 <ArrowUpRight size={19} aria-hidden="true" /></Link>
                </div>
                <div className="home-note-art" aria-hidden="true">
                  <div className="home-note-sheet home-note-sheet-back" />
                  <div className="home-note-sheet home-note-sheet-front"><Braces size={26} /><i /><i /><i /><span>notes.md</span></div>
                </div>
              </div>
            </SpotlightCard>
          </AnimatedContent>
          <AnimatedContent className="home-stats-wrap" delay={0.18}>
            <SpotlightCard className="home-stats-card">
              <div className="home-stat">
                <div className="home-stat-number"><CountUp to={posts.length} /><span>篇</span></div>
                <Link href="/blog">博客文章 <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
              <div className="home-stat">
                <div className="home-stat-number"><CountUp to={notes.length} /><span>则</span></div>
                <Link href="/notes">知识笔记 <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
              <div className="home-stat-caption"><span className="home-status-dot" aria-hidden="true" /> 持续积累，持续更新</div>
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </section>

      <section id="writing" className="site-container site-section home-writing" aria-labelledby="writing-title">
        <AnimatedContent className="site-section-heading home-section-heading">
          <div>
            <p className="site-eyebrow"><DecryptedText text="02 / LATEST WRITING" /></p>
            <h2 id="writing-title" className="site-heading">最近，在想这些。</h2>
          </div>
          <Link href="/blog" className="site-link">全部文章 <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </AnimatedContent>
        {featuredPost ? (
          <div className="home-writing-grid">
            <AnimatedContent className="home-feature-wrap">
              <SpotlightCard className="home-feature-card">
                <Link href={featuredPost.url} className="home-feature-link">
                  <div className="home-feature-art" aria-hidden="true">
                    <div className="home-feature-art-lines" />
                    <span className="home-feature-art-symbol">&#123; &#125;</span>
                    <span className="home-feature-art-caption">NOTES FROM THE BUILD</span>
                    <ArrowUpRight size={24} className="home-feature-art-arrow" />
                  </div>
                  <div className="home-feature-content">
                    <div className="home-post-meta"><span className="home-post-selected">LATEST ENTRY</span><time dateTime={featuredPost.data.date}>{featuredPost.data.date.replaceAll('-', '.')}</time></div>
                    <h3>{featuredPost.data.title}</h3>
                    {featuredPost.data.description && <p>{featuredPost.data.description}</p>}
                    <div className="home-post-footer">
                      <div className="home-post-tags">{featuredPost.data.tags?.slice(0, 2).map((tag) => <span className="site-tag" key={tag}>{tag}</span>)}</div>
                      <span className="home-read-link">开始阅读 <ArrowUpRight size={16} aria-hidden="true" /></span>
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            </AnimatedContent>
            <div className="home-post-list">
              {otherPosts.map((post, index) => (
                <AnimatedContent key={post.url} delay={0.08 * (index + 1)} className="home-post-row-wrap">
                  <article className="home-post-row">
                    <div className="home-post-meta"><span className="home-post-index">0{index + 2}</span><time dateTime={post.data.date}>{post.data.date.replaceAll('-', '.')}</time></div>
                    <h3><Link href={post.url}>{post.data.title}<ArrowUpRight size={20} aria-hidden="true" /></Link></h3>
                    {post.data.description && <p>{post.data.description}</p>}
                    <div className="home-post-tags">{post.data.tags?.slice(0, 2).map((tag) => <span className="site-tag" key={tag}>{tag}</span>)}</div>
                  </article>
                </AnimatedContent>
              ))}
              <Link href="/blog" className="home-archive-link"><span>更多思考，留在文字里。<small>探索完整文章归档</small></span><ArrowRight size={22} aria-hidden="true" /></Link>
            </div>
          </div>
        ) : (
          <div className="site-panel home-empty"><BookOpen size={26} aria-hidden="true" /><p>新的记录正在路上。</p><Link href="/notes" className="site-link">先逛逛知识笔记 <ArrowRight size={16} aria-hidden="true" /></Link></div>
        )}
      </section>

      <section className="home-toolchain" aria-labelledby="toolchain-title">
        <div className="site-container home-toolchain-heading">
          <div><Layers3 size={18} aria-hidden="true" /><h2 id="toolchain-title">让想法落地的工具</h2></div>
          <span className="home-card-kicker">A TOOLBOX, ALWAYS EVOLVING</span>
        </div>
        <div className="site-container home-logo-loop"><LogoLoop items={TOOLCHAIN} /></div>
      </section>
      <section className="site-container home-outro" aria-labelledby="outro-title">
        <AnimatedContent>
          <p className="site-eyebrow">THE NEXT ITERATION</p>
          <h2 id="outro-title" className="sr-only">保持好奇，继续构建。</h2>
          <div className="home-outro-title" aria-hidden="true"><ScrollReveal>保持好奇，继续构建。</ScrollReveal></div>
          <p className="site-muted">简单、可组合，在真实项目中不断迭代。</p>
          <Magnet><Link href="/about" className="home-outro-link"><ShinyText text="这个空间背后的故事" /><ArrowUpRight size={21} aria-hidden="true" /></Link></Magnet>
        </AnimatedContent>
        <Terminal className="home-outro-mark" size={160} strokeWidth={0.6} aria-hidden="true" />
      </section>
    </div>
  );
}
