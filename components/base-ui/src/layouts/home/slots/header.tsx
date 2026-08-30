'use client';

import { type ComponentProps, Fragment, useRef } from 'react';
import { cva } from 'class-variance-authority';
import Link from 'fumadocs-core/link';
import { NavigationMenu as Primitive } from '@base-ui/react/navigation-menu';
import { cn } from '@base-ui/utils/cn';
import { type LinkItemType, LinkItem } from '@base-ui/layouts/shared';
import { buttonVariants } from '@base-ui/components/ui/button';
import { Languages, Menu } from 'lucide-react';
import { useIsScrollTop } from '@base-ui/utils/use-is-scroll-top';
import { useHomeLayout } from '..';
import { SidebarTrigger } from '@base-ui/components/sidebar/base';

export const navItemVariants = cva('[&_svg]:size-4', {
  variants: {
    variant: {
      main: 'inline-flex items-center gap-1 p-2 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary',
      button: buttonVariants({
        color: 'secondary',
        className: 'gap-1.5',
      }),
      icon: buttonVariants({
        color: 'ghost',
        size: 'icon',
      }),
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

export const bracketLinkClassName =
  'group site-mono flex items-center gap-1 text-md font-semibold tracking-[0.08em] text-fd-foreground/80 transition-colors hover:text-fd-foreground data-[active=true]:text-fd-foreground';

const bracketSpanClassName =
  'text-cossistant-orange opacity-0 transition-opacity duration-150 group-data-[active=true]:opacity-100';

export function Header(props: ComponentProps<'header'>) {
  const {
    navItems,
    slots,
    props: { nav },
  } = useHomeLayout();
  const listRef = useRef<HTMLUListElement>(null);
  const transparentMode = nav?.transparentMode ?? 'none';
  const isTop = useIsScrollTop({ enabled: transparentMode === 'top' }) ?? true;
  const isNavTransparent = transparentMode === 'top' ? isTop : transparentMode === 'always';

  const list = (
    <Primitive.List
      ref={listRef}
      // defaults to <ul>, but its children (nav title, link groups, controls) are not <li> —
      // render a <div> for valid list semantics, like the Radix UI variant does with `asChild`
      render={<div />}
      className="flex h-14 w-full mx-auto max-w-(--fd-layout-width) items-center border-x border-dashed px-4"
    >
      {slots.navTitle && (
        <slots.navTitle className="inline-flex flex-1 items-center gap-2.5 font-semibold" />
      )}
      {nav?.children}
      <ul className="flex flex-row items-center gap-2 px-6 max-md:hidden">
        {navItems
          .filter((item) => !isSecondary(item))
          .map((item, i) => (
            <NavigationMenuLinkItem key={i} item={item} className="text-sm" />
          ))}
      </ul>
      <div className="flex flex-row items-center justify-end gap-1.5 flex-1 max-md:hidden">
        {slots.searchTrigger && (
          <slots.searchTrigger.full
            hideIfDisabled
            className="w-full max-w-[160px] text-sm"
          />
        )}
        <ul className="flex flex-row gap-2 items-center empty:hidden">
          {navItems.filter(isSecondary).map((item, i) => (
            <NavigationMenuLinkItem
              key={i}
              className={cn(item.type === 'icon' && '-mx-1 first:ms-0 last:me-0')}
              item={item}
            />
          ))}
        </ul>
        {slots.languageSelect && (
          <slots.languageSelect.root>
            <Languages className="size-5" />
          </slots.languageSelect.root>
        )}
        {slots.themeSwitch && <slots.themeSwitch />}
      </div>
      <div className="flex flex-row items-center ms-auto -me-1.5 gap-1 md:hidden">
        <SidebarTrigger
          className={cn(
            buttonVariants({
              color: 'ghost',
              size: 'icon-sm',
              className: 'p-2',
            }),
          )}
        >
          <Menu />
        </SidebarTrigger>
      </div>
    </Primitive.List>
  );

  return (
    <header
      id="nd-nav"
      {...props}
      className={cn('sticky h-14 top-0 z-40', props.className)}
    >
      <Primitive.Root
        className={(s) =>
          cn(
            'backdrop-blur-lg border-b border-dashed transition-[box-shadow,background-color,border-radius]',
            (!isNavTransparent || s.open) && 'bg-fd-background/80',
          )
        }
      >
        {list}
        <Primitive.Portal>
          <Primitive.Positioner
            side="bottom"
            anchor={listRef}
            collisionPadding={{ top: 5, bottom: 5 }}
            className="z-40 box-border h-(--positioner-height) w-(--anchor-width) max-w-(--available-width) duration-(--duration) ease-(--easing) before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5"
            style={{
              ['--duration' as string]: '0.35s',
              ['--easing' as string]: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <Primitive.Popup className="relative border h-(--popup-height) w-full rounded-xl bg-fd-popover/80 text-fd-popover-foreground backdrop-blur-md shadow-lg transition-[opacity,width,height] duration-(--duration) ease-(--easing) data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:opacity-0">
              <Primitive.Viewport className="relative size-full overflow-hidden" />
            </Primitive.Popup>
          </Primitive.Positioner>
        </Primitive.Portal>
      </Primitive.Root>
    </header>
  );
}

export function isSecondary(item: LinkItemType): boolean {
  if ('secondary' in item && item.secondary != null) return item.secondary;

  return item.type === 'icon';
}

function NavigationMenuLinkItem({
  item,
  className,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === 'custom') return item.children;

  if (item.type === 'menu') {
    const children = item.items.map((child, j) => {
      if (child.type === 'custom') {
        return <Fragment key={j}>{child.children}</Fragment>;
      }

      const {
        banner = child.icon ? (
          <div className="w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4">{child.icon}</div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <Primitive.Link
          key={`${j}-${child.url}`}
          render={
            <Link
              href={child.url}
              external={child.external}
              {...rest}
              className={cn(
                'flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground',
                rest.className,
              )}
            >
              {rest.children ?? (
                <>
                  {banner}
                  <p className="text-base font-medium">{child.text}</p>
                  <p className="text-sm text-fd-muted-foreground empty:hidden">
                    {child.description}
                  </p>
                </>
              )}
            </Link>
          }
        />
      );
    });

    return (
      <Primitive.Item className={cn('list-none', className)} {...props}>
        <Primitive.Trigger className={cn(navItemVariants(), 'rounded-md')}>
          {item.url ? (
            <Link href={item.url} external={item.external}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </Primitive.Trigger>
        <Primitive.Content
          className={cn(
            'h-full w-(--anchor-width) max-w-(--available-width) p-3',
            'transition-[opacity,transform,translate] duration-(--duration) ease-(--easing)',
            'data-starting-style:opacity-0 data-ending-style:opacity-0',
            'data-starting-style:data-[activation-direction=left]:-translate-x-1/2',
            'data-starting-style:data-[activation-direction=right]:translate-x-1/2',
            'data-ending-style:data-[activation-direction=left]:translate-x-1/2',
            'data-ending-style:data-[activation-direction=right]:-translate-x-1/2',
            'grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {children}
        </Primitive.Content>
      </Primitive.Item>
    );
  }

  if (item.type === 'bracket') {
    return (
      <Primitive.Item className={cn('list-none', className)} {...props}>
        <Primitive.Link
          render={
            <LinkItem item={item} className={bracketLinkClassName}>
              <span className={bracketSpanClassName}>[</span>
              {item.text}
              <span className={bracketSpanClassName}>]</span>
            </LinkItem>
          }
        />
      </Primitive.Item>
    );
  }

  return (
    <Primitive.Item className={cn('list-none', className)} {...props}>
      <Primitive.Link
        render={
          <LinkItem
            item={item}
            aria-label={item.type === 'icon' ? item.label : undefined}
            className={cn(navItemVariants({ variant: item.type }))}
          >
            {item.type === 'icon' ? item.icon : item.text}
          </LinkItem>
        }
      />
    </Primitive.Item>
  );
}
