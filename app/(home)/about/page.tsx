import type { Metadata } from 'next';
import { Bracket, Corners, TagPill } from '@/components/blog/shared';
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

/** 本站技术栈：框架 / UI 风格 / 华丽效果（可点击跳转 Aceternity 组件页）。 */
const SITE_STACK: { label: string; value: string | EffectLink[] }[] = [
  { label: '框架', value: 'Fumadocs · Next.js（服务端渲染）' },
  { label: 'UI 风格', value: '虚线几何 + 橙色点缀' },
  {
    label: '华丽效果',
    value: [
      {
        name: '加密动态文本',
        url: 'https://ui.aceternity.com/components/encrypted-text',
      },
      {
        name: '矩形背景涟漪',
        url: 'https://ui.aceternity.com/components/background-ripple-effect',
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
    <div className="flex flex-col flex-1">
      <div className='px-6 py-10 md:px-12 lg:px-24'>
        <div className='mx-auto w-full max-w-4xl'>
      {/* 页头：个人档案布局，独立于首页的满幅横幅，沿用虚线几何 + 四角直角括号 */}
        <div className="px-6 py-10 text-center md:px-12 lg:px-24">
          <Bracket className="text-base md:text-lg lg:text-xl">About</Bracket>
          <div className="mt-3 site-mono text-[10px] tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
            PROFILE / 00
          </div>
          <div className="mx-auto mt-8 grid max-w-2xl border-y border-dashed border-neutral-300 text-left dark:border-neutral-700 sm:grid-cols-3">
            {FACTS.map((fact, index) => (
              <div
                key={fact.k}
                className="flex items-center justify-between gap-4 border-b border-dashed border-neutral-300 py-3 last:border-b-0 dark:border-neutral-700 sm:block sm:border-b-0 sm:border-r sm:px-4 sm:last:border-r-0"
              >
                <span className="site-mono text-[10px] tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                  0{index + 1} / {fact.k}
                </span>
                <span className="text-sm font-medium sm:mt-2 sm:block">
                  {fact.v}
                </span>
              </div>
            ))}
          </div>
        </div>

      {/* 教育 */}
      <section>
        <div className="py-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Bracket>教育</Bracket>
              <span className="site-mono text-[10px] tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                01 / FORMATION
              </span>
            </div>
            <div className="mt-6 flex flex-col">
              {EDUCATION.map((item, index) => (
                <div
                  key={item.period}
                  className="group relative border-l border-dashed border-neutral-300 pb-8 pl-6 last:pb-0 dark:border-neutral-700"
                >
                  <span className="absolute -left-[5px] top-1.5 size-[9px] bg-cossistant-orange transition-transform group-hover:scale-125" />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Bracket className="text-[11px]">{item.period}</Bracket>
                    <span className="site-mono text-[10px] tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                      0{index + 1} / NODE
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold tracking-tight">
                    {item.school}
                    <span className="ml-2 font-mono text-sm font-normal text-neutral-500 dark:text-neutral-400">
                      {item.degree}
                    </span>
                  </h3>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                    {item.major}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 关于本站 */}
      <section className="border-t border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="py-6">
          <div className="max-w-3xl">
            <Bracket>关于本站</Bracket>
            <div className="mt-6 flex flex-col">
              {SITE_STACK.map((row, index) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-2 border-b border-dashed border-neutral-300 py-4 transition-colors last:border-b-0 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900/50 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <div className="flex w-20 shrink-0 items-center gap-2">
                    <span className="site-mono text-[10px] text-cossistant-orange">
                      0{index + 1}
                    </span>
                    <span className="site-mono text-xs text-neutral-500 dark:text-neutral-400">
                      {row.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(row.value) ? (
                      row.value.map((v) => (
                        <a
                          key={v.name}
                          href={v.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 border border-dashed border-neutral-300 px-2.5 py-1 font-mono text-xs text-neutral-600 transition-colors hover:border-cossistant-orange hover:bg-neutral-50 hover:text-cossistant-orange dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
                        >
                          {v.name}
                          <span className="text-cossistant-orange">↗</span>
                        </a>
                      ))
                    ) : (
                      <span className="text-sm text-neutral-800 dark:text-neutral-200">
                        {row.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 个人开源项目 */}
      <section className="border-t border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="py-6">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Bracket>个人开源项目</Bracket>
              <span className="site-mono text-[10px] tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                03 / OPEN SOURCE
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {PROJECTS.map((project, index) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex min-h-[220px] flex-col border border-dashed border-neutral-300 p-5 transition-colors hover:border-cossistant-orange hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cossistant-orange dark:border-neutral-700 dark:hover:bg-neutral-900/50"
                >
                  <Corners />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="site-mono text-[10px] tracking-[0.12em] text-cossistant-orange">
                        0{index + 1}
                      </span>
                      <h3 className="truncate font-mono text-base font-bold transition-colors group-hover:text-cossistant-orange">
                      {project.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-cossistant-orange opacity-0 transition-opacity group-hover:opacity-100">
                      [→]
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {project.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <TagPill key={tag} tag={tag} />
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 参与开源项目 */}
      <section className="border-t border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="py-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Bracket>参与开源项目</Bracket>
              <span className="site-mono text-[10px] tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                04 / CONTRIBUTIONS
              </span>
            </div>
            <div className="mt-6 flex flex-col">
              {CONTRIBUTIONS.map((item, index) => (
                <div
                  key={item.name}
                  className="group flex gap-4 border-b border-dashed border-neutral-300 py-4 transition-colors last:border-b-0 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900/50"
                >
                  <span className="site-mono pt-1 text-[10px] text-cossistant-orange">
                    0{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-base font-bold transition-colors hover:text-cossistant-orange"
                      >
                        {item.name}
                      </a>
                      <span className="font-mono text-xs text-cossistant-orange">
                        {item.role}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 联系 */}
      <section className="border-t border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="py-6">
          <div className="max-w-3xl">
            <div className="site-panel relative p-5 md:p-6">
              <Corners />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Bracket>联系</Bracket>
                <span className="site-mono text-[10px] tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                  05 / OPEN CHANNEL
                </span>
              </div>
              <p className="mt-4 max-w-lg text-neutral-600 dark:text-neutral-400">
                如果你也对 AI 工程、开源或几何美学感兴趣，欢迎交流。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <TagPill tag="GitHub" href={`https://github.com/${gitConfig.user}`} />
                <TagPill
                  tag="Email"
                  href={`mailto:${gitConfig.user}@users.noreply.github.com`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <section className="py-5 site-mono text-[10px] tracking-[0.14em] text-neutral-400 dark:text-neutral-500 lg:px-24">
        <Bracket>感谢来访</Bracket>
      </section>
      </div>
      </div>
    </div>
  );
}
