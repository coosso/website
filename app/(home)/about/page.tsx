import type { Metadata } from 'next';
import { ArrowDown, ArrowUpRight, Code2, GitBranch, Mail } from 'lucide-react';
import { AnimatedContent, BlurText, DecryptedText, Magnet, ScrollReveal, ShinyText, SpotlightCard, StarBorder, ThreadsBackground, TiltedCard } from '@/components/react-bits';
import '@/components/site/about.css';
import { gitConfig } from '@/lib/shared';

export const metadata: Metadata = {
  title: '关于',
  description: '关于我、本站，以及我的开源项目。',
};

const EDUCATION = [
  {
    period: '2022 — 2025',
    school: '理工大学',
    degree: '硕士',
    major: '软件工程',
    note: '研究方向：LLM 应用与多智能体系统。',
  },
  {
    period: '2018 — 2022',
    school: '师范大学',
    degree: '学士',
    major: '信息与计算科学',
    note: '数学与计算机交叉学科，打下扎实的算法与数理基础。',
  },
];

type EffectLink = { name: string; url: string };

/** 页头元信息：角色 / 方向 / 状态。 */
const FACTS = [
  { k: '角色', v: '全栈工程师' },
  { k: '方向', v: 'LLM 应用 / 多智能体' },
  { k: '状态', v: '开源 · 持续构建' },
];

/** 本站技术栈与实际采用的 React Bits 组件。 */
const SITE_STACK: { label: string; value: string | EffectLink[] }[] = [
  { label: '框架', value: 'Fumadocs · Next.js（服务端渲染）' },
  { label: 'UI 风格', value: '黑曜石 × 电光橙' },
  {
    label: '交互动效',
    value: [
      {
        name: 'React Bits · Decrypted Text',
        url: 'https://reactbits.dev/text-animations/decrypted-text',
      },
      {
        name: 'React Bits · Threads',
        url: 'https://reactbits.dev/backgrounds/threads',
      },
    ],
  },
];

const PROJECTS = [
  {
    name: 'cossistant',
    desc: '基于大语言模型的智能编程助手，支持多智能体协作、代码生成与仓库级理解。',
    tags: ['TypeScript', 'Next.js', 'Claude'],
    url: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  },
  {
    name: 'agent-kit',
    desc: '轻量的多智能体编排框架，用类型安全的 Schema 描述 Agent 工作流与工具调用。',
    tags: ['TypeScript', 'Zod', 'LLM'],
    url: `https://github.com/${gitConfig.user}/agent-kit`,
  },
  {
    name: 'ripple-ui',
    desc: '虚线几何风格的 React 组件库，内置加密文本、背景涟漪等动效组件。',
    tags: ['React', 'Tailwind CSS', 'Motion'],
    url: `https://github.com/${gitConfig.user}/ripple-ui`,
  },
  {
    name: 'notes-cli',
    desc: '把 Markdown 笔记一键发布成 Fumadocs 站点的命令行工具。',
    tags: ['Node.js', 'CLI', 'Fumadocs'],
    url: `https://github.com/${gitConfig.user}/notes-cli`,
  },
];

const CONTRIBUTIONS = [
  {
    name: 'fumadocs',
    role: '文档改进',
    desc: '完善中文文档，修复若干主题与 i18n 相关的边界问题。',
    url: 'https://fumadocs.dev',
  },
  {
    name: 'langchainjs',
    role: '类型与稳定性',
    desc: '修复类型定义错误与若干异步调用中的资源泄漏。',
    url: 'https://github.com/langchain-ai/langchainjs',
  },
  {
    name: 'motion',
    role: '示例与文档',
    desc: '补充 useInView 等 API 的示例与迁移说明。',
    url: 'https://github.com/motiondivision/motion',
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero site-container">
        <div className="about-hero-backdrop" aria-hidden="true">
          <ThreadsBackground />
        </div>
        <AnimatedContent className="about-intro">
          <p className="site-eyebrow"><DecryptedText text="ABOUT / THE BUILDER" /></p>
          <h1 className="about-title">全栈构建，<br /><BlurText text="探索智能协作。" /></h1>
          <p className="site-lead about-intro-copy">关于我、正在构建的项目，以及这个持续生长的空间。</p>
          <a href="#about-projects" className="about-jump site-link">探索我的项目 <ArrowDown size={16} aria-hidden="true" /></a>
        </AnimatedContent>

        <AnimatedContent className="about-identity-wrap" delay={0.15}>
          <TiltedCard className="about-identity">
            <div className="about-identity-top"><span className="site-mono">PROFILE / 00</span><span className="about-status">持续构建</span></div>
            <div className="about-identity-art" aria-hidden="true">
              <span className="about-orbit about-orbit-one" />
              <span className="about-orbit about-orbit-two" />
              <span className="about-orbit about-orbit-three" />
              <span className="about-monogram">c<span>.</span></span>
              <Code2 className="about-code-mark" strokeWidth={1.2} />
            </div>
            <div className="about-identity-name"><ShinyText text={gitConfig.user} /><span>ENGINEER / OPEN SOURCE</span></div>
            <dl className="about-facts">
              {FACTS.map((fact) => <div key={fact.k}><dt>{fact.k}</dt><dd>{fact.v}</dd></div>)}
            </dl>
          </TiltedCard>
        </AnimatedContent>
      </section>

      <section className="site-container about-statement">
        <p className="site-eyebrow">FOCUS / 01</p>
        <ScrollReveal className="about-statement-text">围绕 LLM 应用与多智能体系统，持续构建与开源。</ScrollReveal>
        <div className="about-focus-tags"><span className="site-tag">全栈工程</span><span className="site-tag">LLM 应用</span><span className="site-tag">多智能体</span><span className="site-tag">开源</span></div>
      </section>

      <section className="site-container site-section about-formation">
        <div className="about-section-intro"><p className="site-eyebrow">FORMATION / 02</p><h2 className="site-section-heading">知识的来处</h2><p className="site-muted">从数理基础，到软件工程。</p></div>
        <div className="about-timeline">
          {EDUCATION.map((item, index) => (
            <AnimatedContent key={item.period} delay={index * 0.1} className="about-timeline-item">
              <span className="about-timeline-dot" aria-hidden="true" />
              <p className="about-period site-mono">{item.period}</p>
              <h3>{item.school}<span>{item.degree} / {item.major}</span></h3>
              <p className="site-muted">{item.note}</p>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section id="about-projects" className="site-container site-section about-projects-section">
        <div className="about-section-heading"><div><p className="site-eyebrow">SELECTED PROJECTS / 03</p><h2 className="site-section-heading">想法落地的地方</h2></div><a href={`https://github.com/${gitConfig.user}`} target="_blank" rel="noreferrer" className="site-link">在 GitHub 探索 <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="about-project-grid">
          {PROJECTS.map((project, index) => (
            <AnimatedContent key={project.name} delay={index % 2 * 0.1}>
              <TiltedCard className="about-project-tilt">
                <SpotlightCard className="about-project">
                  <a href={project.url} target="_blank" rel="noreferrer" className="about-project-link">
                    <div className={`about-project-art about-project-art-${index + 1}`} aria-hidden="true"><span className="about-project-symbol">{['{ }', '↗', '≈', '>_'][index]}</span><span className="about-project-art-label">BUILD / 0{index + 1}</span><span className="about-project-arrow"><ArrowUpRight size={21} /></span></div>
                    <div className="about-project-content"><h3>{project.name}</h3><p>{project.desc}</p><div className="about-project-tags">{project.tags.map((tag) => <span key={tag} className="site-tag">{tag}</span>)}</div></div>
                  </a>
                </SpotlightCard>
              </TiltedCard>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="site-container site-section about-contributions">
        <div className="about-section-intro"><p className="site-eyebrow">CONTRIBUTIONS / 04</p><h2 className="site-section-heading">参与，共同完善</h2><p className="site-muted">在开源社区留下的一些足迹。</p></div>
        <div className="about-contribution-list">
          {CONTRIBUTIONS.map((item, index) => (
            <AnimatedContent key={item.name} delay={index * 0.08}>
              <a href={item.url} target="_blank" rel="noreferrer" className="about-contribution"><span className="about-contribution-number site-mono">0{index + 1}</span><div><div className="about-contribution-title"><h3>{item.name}</h3><span>{item.role}</span></div><p>{item.desc}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="site-container site-section about-site">
        <SpotlightCard className="about-site-panel">
          <div><p className="site-eyebrow">COLOPHON / 05</p><h2 className="site-section-heading">这个空间，如何构成</h2><p className="site-muted">内容与代码，共同构成这里的每一页。</p></div>
          <dl className="about-stack">{SITE_STACK.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{Array.isArray(row.value) ? row.value.map((item) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer">{item.name}<ArrowUpRight size={13} aria-hidden="true" /></a>) : row.value}</dd></div>)}</dl>
        </SpotlightCard>
      </section>

      <section className="site-container site-section about-contact">
        <AnimatedContent>
          <p className="site-eyebrow">OPEN CHANNEL / 06</p>
          <h2>让下一次交流，<br /><span>成为新的起点。</span></h2>
          <p className="site-lead">如果你也对 AI 工程、开源或几何美学感兴趣，欢迎交流。</p>
          <div className="about-contact-actions">
            <Magnet><StarBorder><a className="site-button" href={`https://github.com/${gitConfig.user}`} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" />GitHub<ArrowUpRight size={16} aria-hidden="true" /></a></StarBorder></Magnet>
            <Magnet><a className="site-button-secondary" href={`mailto:${gitConfig.user}@users.noreply.github.com`}><Mail size={17} aria-hidden="true" />Email</a></Magnet>
          </div>
        </AnimatedContent>
      </section>
    </div>
  );
}
