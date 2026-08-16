import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: (
        <span className="inline-flex items-center gap-1">
          <span className="text-cossistant-orange">[</span>
          <span>{appName}</span>
          <span className="text-cossistant-orange">]</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        type: 'bracket',
        text: 'Docs',
        url: '/docs',
        on:'nav',
      },
      {
        type: 'bracket',
        text: 'Blog',
        url: '/blog',
        on:'nav',
      },
    ],
  };
}
