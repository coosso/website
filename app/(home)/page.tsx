import Link from 'next/link';
import {
  ArrowUpRight,
  Cpu,
  GitBranch,
  Layers3,
  Terminal,
  Workflow,
} from 'lucide-react';
import { BackgroundRippleEffect } from '@/components/aceternity-ui/background-ripple-effect';
import { Bracket } from '@/components/blog/shared';
import {
  AnimatedContent,
  CountUp,
  DecryptedText,
  Magnet,
  ShinyText,
  SpotlightCard,
} from '@/components/react-bits/home-effects';
import { getBlogPosts, notesSource } from '@/lib/source';

const TECH_STACK = [
  {
    category: 'LANGUAGES',
    items: ['Python', 'TypeScript'],
    icon: Terminal,
  },
  {
    category: 'FRAMEWORKS',
    items: ['LangChain', 'FastAPI', 'React'],
    icon: Layers3,
  },
  {
    category: 'AGENT TOOLING',
    items: ['Claude Code', 'Codex', 'Pi Agent', 'Hermes Agent'],
    icon: Workflow,
  },
];

const SIGNALS = [
  { label: 'MODE', value: 'BUILDING', tone: 'orange' },
  { label: 'FOCUS', value: 'AI ENGINEERING', tone: 'default' },
  { label: 'STATUS', value: 'OPEN TO IDEAS', tone: 'default' },
];

function CornerMarks() {
  return (
    <>
      <span aria-hidden className="site-corner-mark site-corner-mark--tl" />
      <span aria-hidden className="site-corner-mark site-corner-mark--tr" />
      <span aria-hidden className="site-corner-mark site-corner-mark--bl" />
      <span aria-hidden className="site-corner-mark site-corner-mark--br" />
    </>
  );
}

export default function HomePage() {
  const posts = getBlogPosts();
  const noteCount = notesSource.getPages().length;

  return (
    <div className="home-page flex flex-1 flex-col">
      <section className="home-hero relative isolate overflow-hidden border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <BackgroundRippleEffect />

        <div className="relative z-10 min-h-0 md:min-h-[640px]">
          <div className="w-full px-6 md:px-12 lg:px-24">
            <div className="relative mx-auto min-h-0 w-full max-w-4xl md:min-h-[640px]">
              <div className="flex min-h-0 flex-col justify-between pt-16 md:min-h-[640px] md:max-w-[68%] md:pt-24 lg:pt-28">
                <AnimatedContent>
                  <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 site-mono text-[10px] font-semibold tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                    <span className="text-cossistant-orange">01 / IDENTITY</span>
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 animate-pulse rounded-full bg-cossistant-orange" />
                      PERSONAL SYSTEM ONLINE
                    </span>
                  </div>

                  <Bracket className="text-sm md:text-base">专注技术成长</Bracket>
                  <h1 className="mt-5 max-w-[900px] whitespace-nowrap text-[clamp(2.9rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.085em] text-neutral-900 dark:text-neutral-50">
                    <span className="text-cossistant-orange">[</span>
                    <DecryptedText text="可塑性空间" />
                    <span className="text-cossistant-orange">]</span>
                  </h1>
                  <p className="mt-8 max-w-xl text-base leading-8 text-neutral-600 dark:text-neutral-400 md:text-lg">
                    写代码，做研究，记录那些让系统变得更可靠的细节。
                    <br className="hidden md:block" />
                    这里是一个持续构建中的个人技术空间。
                  </p>
                </AnimatedContent>

                <div className="mt-16 flex flex-wrap items-center gap-3">
                  <Magnet>
                    <Link
                      href="/blog"
                      className="group inline-flex items-center gap-3 bg-cossistant-orange px-4 py-3 site-mono text-xs font-bold tracking-[0.08em] text-white transition-shadow hover:shadow-[0_4px_24px_-8px_var(--site-orange)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cossistant-orange"
                    >
                      阅读最新文章
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Magnet>
                  <Magnet>
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 border border-dashed border-neutral-400 px-4 py-3 site-mono text-xs font-semibold tracking-[0.08em] text-neutral-700 transition-colors hover:border-cossistant-orange hover:text-cossistant-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cossistant-orange dark:border-neutral-600 dark:text-neutral-300"
                    >
                      查看档案 <span aria-hidden>[→]</span>
                    </Link>
                  </Magnet>
                </div>
              </div>

              <div className="mt-8 grid gap-10 md:absolute md:inset-y-0 md:right-0 md:mt-0 md:flex md:w-[34%] md:flex-col md:justify-between md:py-10">
                <AnimatedContent delay={180}>
                  <SpotlightCard className="site-panel relative p-5 md:p-6">
                    <CornerMarks />
                    <div className="mb-7 flex items-center justify-between site-mono text-[10px] tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                      <span>SYS / READOUT</span>
                      <Cpu className="size-4 text-cossistant-orange" />
                    </div>
                    <div className="space-y-4">
                      {SIGNALS.map((signal) => (
                        <div key={signal.label} className="grid grid-cols-[80px_1fr] gap-3 border-b border-dashed border-neutral-300 pb-3 last:border-0 last:pb-0 dark:border-neutral-700">
                          <span className="site-mono text-[10px] tracking-[0.13em] text-neutral-500 dark:text-neutral-500">
                            {signal.label}
                          </span>
                          <span className={signal.tone === 'orange' ? 'site-mono text-xs font-bold tracking-[0.08em] text-cossistant-orange' : 'site-mono text-xs font-bold tracking-[0.08em] text-neutral-800 dark:text-neutral-200'}>
                            {signal.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </AnimatedContent>

                <AnimatedContent className="mt-10" delay={300}>
                  <div className="mb-4 flex items-center justify-between site-mono text-[10px] tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                    <span>TERMINAL / NOW</span>
                    <span>~/space</span>
                  </div>
                  <div className="home-terminal relative border-l-2 border-cossistant-orange bg-neutral-950 p-5 font-mono text-xs leading-7 text-neutral-300 shadow-[12px_12px_0_var(--site-surface-raised)] dark:bg-black">
                    <p className="home-terminal-line"><span className="text-cossistant-orange">$</span> whoami</p>
                    <p className="home-terminal-line home-terminal-line--response [--line-delay:250ms]">coosso / full-stack engineer</p>
                    <p className="home-terminal-line [--line-delay:500ms]"><span className="text-cossistant-orange">$</span> cat focus.txt</p>
                    <p className="home-terminal-line home-terminal-line--response [--line-delay:750ms]">reliable agents, useful tools</p>
                    <p className="home-terminal-line [--line-delay:1000ms]"><span className="text-cossistant-orange">$</span> <span aria-hidden="true" className="inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-cossistant-orange" /></p>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-dashed border-neutral-300 px-6 py-3 site-mono text-[10px] tracking-[0.14em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-500 md:px-10">
          <span>SCROLL TO EXPLORE</span>
          <span className="text-cossistant-orange">+ + +</span>
          <span>EST. 2024 — ONGOING</span>
        </div>
      </section>

      <section className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="mx-auto grid w-full max-w-4xl md:grid-cols-[1fr_2fr]">
            <AnimatedContent className="border-b border-dashed border-neutral-300 p-6 md:border-b-0 md:border-r md:p-10 dark:border-neutral-700 lg:p-14">
              <div className="site-section-label">02 / INDEX</div>
              <h2 className="mt-5 max-w-xs text-2xl font-semibold leading-tight tracking-[-0.04em] md:text-3xl">
                思考、实验与正在发生的事。
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                从 Agent 工程到日常开发，把值得复用的判断沉淀下来。
              </p>
            </AnimatedContent>
            <div className="grid sm:grid-cols-3">
              {[
                { label: 'BLOG POSTS', value: posts.length, icon: GitBranch },
                { label: 'NOTES', value: noteCount, icon: Terminal },
                { label: 'CURRENT LOOP', value: '∞', icon: Workflow },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <SpotlightCard key={item.label} className="group relative flex min-h-44 flex-col justify-between border-b border-dashed border-neutral-300 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 dark:border-neutral-700 md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <span className="site-mono text-[10px] tracking-[0.14em] text-neutral-500">0{index + 1}</span>
                      <Icon className="size-5 text-neutral-400 transition-colors group-hover:text-cossistant-orange dark:text-neutral-600" />
                    </div>
                    <div>
                      <div className="text-4xl font-semibold tracking-[-0.07em] text-neutral-900 dark:text-neutral-100">
                        {typeof item.value === 'number' ? <CountUp to={item.value} /> : <span className="home-loop">{item.value}</span>}
                      </div>
                      <div className="mt-2 site-mono text-[10px] font-semibold tracking-[0.13em] text-neutral-500 dark:text-neutral-500">{item.label}</div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="writing" className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 py-10 md:py-14">
            <AnimatedContent className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="site-section-label">03 / RECENT OUTPUT</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] md:text-3xl">最近的记录</h2>
              </div>
              <Link href="/blog" className="group site-mono text-xs font-semibold tracking-[0.08em] text-neutral-500 transition-colors hover:text-cossistant-orange dark:text-neutral-400">
                全部文章 <span className="text-cossistant-orange transition-transform group-hover:ml-1">[→]</span>
              </Link>
            </AnimatedContent>

            <AnimatedContent className="grid border-y border-dashed border-neutral-300 dark:border-neutral-700 md:grid-cols-3" delay={100}>
              {posts.slice(0, 3).map((post, index) => (
                <SpotlightCard
                  key={post.url}
                  className="home-output-card group border-b border-dashed border-neutral-300 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 dark:border-neutral-700"
                >
                  <CornerMarks />
                  <Link
                    href={post.url}
                    className="relative flex h-full min-h-64 flex-col justify-between gap-8 p-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cossistant-orange md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="site-mono text-3xl font-light text-cossistant-orange">[<span className="text-neutral-400 transition-colors group-hover:text-cossistant-orange dark:text-neutral-600">{String(index + 1).padStart(2, '0')}</span>]</span>
                      <ArrowUpRight className="size-4 text-neutral-400 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cossistant-orange" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {post.data.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="border border-dashed border-neutral-300 px-2 py-1 site-mono text-[10px] text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">{tag}</span>
                        ))}
                      </div>
                      <h3 className="min-h-[2.8rem] line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.03em] transition-colors group-hover:text-cossistant-orange">{post.data.title}</h3>
                      <p className="mt-3 mb-5 line-clamp-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{post.data.description}</p>
                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed border-neutral-300 pt-3 site-mono text-[10px] tracking-[0.1em] text-neutral-500 dark:border-neutral-700">
                        <time dateTime={post.data.date}>{post.data.date.replaceAll('-', '.')}</time>
                        <span className="text-cossistant-orange opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">READ ↗</span>
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              ))}
              {posts.length === 0 && (
                <div className="p-7 text-sm text-neutral-500">新的记录正在路上。</div>
              )}
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section id="stack" className="border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="mx-auto grid w-full max-w-4xl md:grid-cols-[1fr_2fr]">
            <AnimatedContent className="border-b border-dashed border-neutral-300 p-6 md:border-b-0 md:border-r md:p-10 dark:border-neutral-700 lg:p-14">
              <div className="site-section-label">04 / TOOLCHAIN</div>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.05em] md:text-3xl">让想法落地的工具。</h2>
              <p className="mt-5 max-w-xs text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                偏爱简单、可组合、能在真实项目里经受住迭代的技术。
              </p>
            </AnimatedContent>
            <div className="divide-y divide-dashed divide-neutral-300 dark:divide-neutral-700">
              {TECH_STACK.map((group, index) => {
                const Icon = group.icon;
                return (
                  <AnimatedContent key={group.category} className="grid gap-5 p-6 md:grid-cols-[160px_1fr] md:items-center md:p-8" delay={index * 90}>
                    <div className="flex items-center gap-3 site-mono text-[10px] font-semibold tracking-[0.13em] text-neutral-500 dark:text-neutral-400">
                      <Icon className="size-4 text-cossistant-orange" />
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="home-tool-tag border border-dashed border-neutral-400 px-3 py-2 site-mono text-xs text-neutral-700 transition-colors hover:border-cossistant-orange hover:text-cossistant-orange dark:border-neutral-600 dark:text-neutral-300">{item}</span>
                      ))}
                    </div>
                  </AnimatedContent>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-dashed border-neutral-300 px-6 py-16 dark:border-neutral-700 md:px-12 md:py-20 lg:px-24">
        <AnimatedContent className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Bracket className="text-sm">END OF INDEX</Bracket>
          <p className="mt-5 text-2xl font-semibold tracking-[-0.05em] md:text-3xl"><ShinyText>保持好奇，继续构建。</ShinyText></p>
          <Magnet>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 site-mono text-xs font-semibold tracking-[0.1em] text-cossistant-orange transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
              了解更多 <ArrowUpRight className="size-4" />
            </Link>
          </Magnet>
        </AnimatedContent>
      </section>
    </div>
  );
}
