'use client';

import type { ComponentProps } from 'react';
import { cn } from '@base-ui/utils/cn';

export function Container(props: ComponentProps<'main'>) {
  return (
    <main
      id="nd-home-layout"
      {...props}
      className={cn('flex flex-1 flex-col [--fd-layout-width:1340px] [--fd-navbar-height:--spacing(14)]', props.className)}
    />
  );
}
