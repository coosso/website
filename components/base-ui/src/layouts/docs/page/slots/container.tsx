'use client';

import type { ComponentProps } from 'react';
import { useDocsPage } from '..';
import { cn } from '@base-ui/utils/cn';

export function Container(props: ComponentProps<'article'>) {
  const { full } = useDocsPage();

  return (
    <article
      id="nd-page"
      data-full={full}
      {...props}
      className={cn(
        'flex flex-col w-full mx-auto [grid-area:main] px-4 py-4 gap-4',
        full && 'max-w-[1168px]',
        props.className,
      )}
    >
      {props.children}
    </article>
  );
}
