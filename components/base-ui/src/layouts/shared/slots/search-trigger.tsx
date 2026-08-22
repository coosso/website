'use client';
import type { ComponentProps } from 'react';
import { Search } from 'lucide-react';
import { useSearchContext } from '@base-ui/contexts/search';
import { useTranslations } from '@fuma-translate/react';
import { cn } from '@base-ui/utils/cn';
import { type ButtonProps, buttonVariants } from '@base-ui/components/ui/button';
import { Dialog } from '@base-ui/react/dialog';

export interface SearchTriggerProps extends Omit<ComponentProps<'button'>, 'color'>, ButtonProps {
  hideIfDisabled?: boolean;
}

export function SearchTrigger({
  hideIfDisabled,
  size = 'icon-sm',
  color = 'ghost',
  ...props
}: SearchTriggerProps) {
  const { enabled, dialogHandle } = useSearchContext();
  const t = useTranslations({ note: 'search trigger' });
  if (hideIfDisabled && !enabled) return null;

  return (
    <Dialog.Trigger
      handle={dialogHandle}
      type="button"
      className={cn(
        buttonVariants({
          size,
          color,
        }),
        props.className,
      )}
      data-search=""
      aria-label={t('Open Search', { note: 'aria-label' })}
    >
      <Search />
    </Dialog.Trigger>
  );
}

export interface FullSearchTriggerProps extends ComponentProps<'button'> {
  hideIfDisabled?: boolean;
}

export function FullSearchTrigger({ hideIfDisabled, ...props }: FullSearchTriggerProps) {
  const { enabled, dialogHandle } = useSearchContext();
  const t = useTranslations({ note: 'search trigger' });
  if (hideIfDisabled && !enabled) return null;

  return (
    <Dialog.Trigger
      handle={dialogHandle}
      type="button"
      data-search-full=""
      {...props}
      className={cn(
        'inline-flex h-7 items-center justify-start gap-2 border border-dashed border-fd-border bg-fd-background px-2 text-xs font-normal text-fd-muted-foreground transition-colors hover:bg-fd-accent/30 hover:cursor-pointer',
        props.className,
      )}
    >
      <Search className="size-4" />
      <span className="truncate">{t('Search')}...</span>
    </Dialog.Trigger>
  );
}
