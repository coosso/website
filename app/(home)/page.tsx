import { BackgroundRippleEffect } from '@/components/aceternity-ui/background-ripple-effect';
import { EncryptedText } from '@/components/aceternity-ui/encrypted-text';
import { Bracket } from '@/components/blog/shared';

const TECH_STACK = [
  { category: '语言', items: ['Python', 'TypeScript'] },
  { category: '框架', items: ['LangChain', 'FastAPI', 'React'] },
  {
    category: 'Agent',
    items: ['Claude Code', 'Codex', 'Pi Agent', 'Hermes Agent', 'DeepSeek Harness'],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">

      <div className="relative flex h-[391px] w-full flex-col items-start justify-start overflow-hidden pt-24">
        <BackgroundRippleEffect />
        <div className="w-full px-6 py-6 md:px-12 lg:px-24">
          <div className="mx-auto w-full max-w-4xl">
            <div className="relative z-10 w-full max-w-3xl">
              <Bracket>专注技术成长</Bracket>
              <h1 className="mt-4 flex items-baseline gap-2 text-2xl font-bold md:text-3xl lg:text-6xl">
                <span className="text-cossistant-orange">[</span>
                <EncryptedText
                  text="可塑性空间"
                  encryptedClassName="text-neutral-600 dark:text-neutral-400"
                  revealedClassName="text-neutral-800 dark:text-neutral-100"
                  revealDelayMs={40}
                />
                <span className="text-cossistant-orange">]</span>
              </h1>
              <p className="mt-4 max-w-lg text-left text-neutral-600 dark:text-neutral-400 text-pretty">
                业精于勤荒于嬉，行成于思毁于随。
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-dashed">
        <div className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto w-full max-w-4xl">
            <p className="font-mono text-xs font-medium">
              <Bracket>Tech Stack</Bracket>
            </p>
            <div className="mt-8 space-y-8">
              {TECH_STACK.map((group) => (
                <div key={group.category}>
                  <h3 className="font-mono text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {group.category}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-dashed border-neutral-300 px-3 py-1.5 font-mono text-sm text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
