'use client';
import * as Base from '@base-ui/components/sidebar/base';
import { cn } from '@base-ui/utils/cn';
import { type ComponentProps, type ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import {
  createPageTreeRenderer,
  type SidebarPageTreeComponents,
} from '@base-ui/components/sidebar/page-tree';
import { createLinkItemRenderer } from '@base-ui/components/sidebar/link-item';
import { buttonVariants } from '@base-ui/components/ui/button';
import { Check, ChevronDown, ChevronsUpDown, Languages, SidebarIcon } from 'lucide-react';
import { mergeRefs } from '@base-ui/utils/merge-refs';
import { useDocsLayout } from '../client';
import { LinkItem } from '@base-ui/layouts/shared';
import { isLayoutTabActive, type LayoutTab } from '@base-ui/layouts/shared';
import { usePathname } from 'fumadocs-core/framework';
import { Popover, PopoverContent, PopoverTrigger } from '@base-ui/components/ui/popover';
import Link from 'fumadocs-core/link';
import { useTreePath } from '@base-ui/contexts/tree';

const itemVariants = cva(
  'relative flex flex-row items-center gap-1.5 rounded-sm p-2 text-xs text-start text-fd-muted-foreground wrap-anywhere [&_svg]:size-3.5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        link: 'transition-colors hover:bg-fd-accent/30 text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/5 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors',
        button:
          'transition-colors hover:bg-fd-accent/50 hover:transition-none',
      },
      highlight: {
        true: "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary/90 data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:inset-s-2.5",
      },
    },
  },
);

export interface SidebarProps extends ComponentProps<'aside'> {
  components?: Partial<SidebarPageTreeComponents>;
  banner?: ReactNode;
  footer?: ReactNode;

  /**
   * Support collapsing the sidebar on desktop mode
   *
   * @defaultValue true
   */
  collapsible?: boolean;
}

export type SidebarProviderProps = Base.SidebarProviderProps;

export const { useSidebar } = Base;

export function SidebarProvider(props: SidebarProviderProps) {
  return <Base.SidebarProvider {...props} />;
}

export function Sidebar({ footer, banner, collapsible = true, components, ...rest }: SidebarProps) {
  const {
    menuItems,
    slots,
    props: { tabs, nav, tabMode },
  } = useDocsLayout();
  const { collapsed } = useSidebar();
  const [footerVisible, setFooterVisible] = useState(true);
  const isFirstCollapse = useRef(true);

  useLayoutEffect(() => {
    if (isFirstCollapse.current) {
      isFirstCollapse.current = false;
      return;
    }
    setFooterVisible(false);
    const timeout = setTimeout(() => setFooterVisible(true), 200);
    return () => clearTimeout(timeout);
  }, [collapsed]);

  const iconLinks = menuItems.filter((item) => item.type === 'icon');
  const viewport = (
    <Base.SidebarViewport>
      <div className="flex flex-col gap-0.5">
        {menuItems
          .filter((v) => v.type !== 'icon')
          .map((item, i, list) => (
            <SidebarLinkItem key={i} item={item} className={cn(i === list.length - 1 && 'mb-4')} />
          ))}
        <SidebarPageTree {...components} />
      </div>
    </Base.SidebarViewport>
  );

  return (
    <>
      <SidebarContent {...rest}>
        
        {!collapsed && viewport}
        {(slots.languageSelect || iconLinks.length > 0 || slots.themeSwitch || footer || collapsible) && (
          <div
            className={cn(
              'flex flex-col',
              collapsed ? 'mt-auto p-4' : 'p-4 pt-2',
              footerVisible ? 'opacity-100' : 'opacity-0',
            )}
            style={{
              transitionProperty: 'opacity',
              transitionDuration: footerVisible ? '300ms' : '0ms',
            }}
          >
            {!collapsed && slots.languageSelect && (
              <slots.languageSelect.root
                variant="secondary"
                className="text-fd-muted-foreground text-start justify-start bg-fd-secondary/50 mb-2"
              >
                <Languages className="size-4.5" />
                <slots.languageSelect.text />
                <ChevronDown className="ms-auto size-3.5" />
              </slots.languageSelect.root>
            )}
            <div
              className={cn(
                'flex text-fd-muted-foreground items-center gap-1 p-0.5 pt-3 empty:hidden border-t border-fd-border',
                collapsed && 'flex-col gap-1 self-center',
              )}
            >
              {slots.searchTrigger && (collapsed ? (
                <slots.searchTrigger.sm />
              ) : (
                <slots.searchTrigger.full className="min-w-0 flex-1" />
              ))}
              {iconLinks.map((item, i) => (
                <LinkItem
                  key={i}
                  item={item}
                  className={cn(buttonVariants({ size: 'icon-sm', color: 'ghost' }))}
                  aria-label={item.label}
                >
                  {item.icon}
                </LinkItem>
              ))}
              {slots.themeSwitch && <slots.themeSwitch className="py-0" />}
              {collapsible && (
                <SidebarCollapseTrigger
                  className={cn(
                    buttonVariants({
                      color: 'ghost',
                      size: 'icon-sm',
                      className: cn('group', !collapsed && 'ms-auto'),
                    }),
                  )}
                >
                  <SidebarIcon className="transition-transform group-data-[collapsed=true]:rotate-180" />
                </SidebarCollapseTrigger>
              )}
            </div>
            {!collapsed && footer}
          </div>
        )}
      </SidebarContent>
      <SidebarDrawer>
        <div className="flex flex-col gap-3 p-4 pb-2">
          <div className="flex text-fd-muted-foreground items-center gap-1.5">
            <div className="flex flex-1">
              {iconLinks.map((item, i) => (
                <LinkItem
                  key={i}
                  item={item}
                  className={cn(
                    buttonVariants({
                      size: 'icon-sm',
                      color: 'ghost',
                      className: 'p-2',
                    }),
                  )}
                  aria-label={item.label}
                >
                  {item.icon}
                </LinkItem>
              ))}
            </div>
            {slots.languageSelect && (
              <slots.languageSelect.root>
                <Languages className="size-4.5" />
                <slots.languageSelect.text />
              </slots.languageSelect.root>
            )}
            {slots.themeSwitch && <slots.themeSwitch className="p-0" />}
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  size: 'icon-sm',
                  className: 'p-2',
                }),
              )}
            >
              <SidebarIcon />
            </SidebarTrigger>
          </div>
          {tabs.length > 0 && <SidebarTabsDropdown tabs={tabs} />}
          {banner}
        </div>
        {viewport}
        <div className="flex flex-col border-t p-4 pt-2 empty:hidden">{footer}</div>
      </SidebarDrawer>
    </>
  );
}

function SidebarFolder(props: ComponentProps<typeof Base.SidebarFolder>) {
  return <Base.SidebarFolder {...props} />;
}

function SidebarCollapseTrigger(props: ComponentProps<typeof Base.SidebarCollapseTrigger>) {
  return <Base.SidebarCollapseTrigger {...props} />;
}

export function SidebarTrigger(props: ComponentProps<'button'>) {
  return <Base.SidebarTrigger {...props} />;
}

function SidebarContent({ ref: refProp, className, children, ...props }: ComponentProps<'aside'>) {
  const ref = useRef<HTMLElement>(null);

  return (
    <Base.SidebarContent>
      {({ collapsed, ref: asideRef }) => (
        <div
          data-sidebar-placeholder=""
          className="sticky top-(--fd-docs-row-1) z-20 [grid-area:sidebar] pointer-events-none *:pointer-events-auto h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] md:layout:[--fd-sidebar-width:228px] md:layout:[--fd-sidebar-collapsed-width:64px] max-md:hidden"
        >
          <aside
            id="nd-sidebar"
            ref={mergeRefs(ref, refProp, asideRef)}
            data-collapsed={collapsed}
            className={cn(
              'absolute flex flex-col w-full inset-s-0 inset-y-0 items-end bg-fd-background text-sm duration-250 *:w-(--fd-sidebar-width) *:transition-[width] data-[collapsed=true]:*:w-(--fd-sidebar-collapsed-width)',
              className,
            )}
            {...props}
          >
            {children}
          </aside>
        </div>
      )}
    </Base.SidebarContent>
  );
}

function SidebarDrawer({
  children,
  className,
  ...props
}: ComponentProps<typeof Base.SidebarDrawerContent>) {
  return (
    <>
      <Base.SidebarDrawerOverlay className="fixed z-40 inset-0 backdrop-blur-xs data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out" />
      <Base.SidebarDrawerContent
        className={cn(
          'fixed text-[0.9375rem] flex flex-col shadow-lg border-s inset-e-0 inset-y-0 w-[85%] max-w-[380px] z-40 bg-fd-background data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out',
          className,
        )}
        {...props}
      >
        {children}
      </Base.SidebarDrawerContent>
    </>
  );
}

function SidebarSeparator({ className, style, children, ...props }: ComponentProps<'p'>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarSeparator
      className={cn(
        'inline-flex items-center gap-2 mb-1 px-2 mt-6 empty:mb-0 [&_svg]:size-4 [&_svg]:shrink-0',
        depth === 0 && 'first:mt-0',
        className,
      )}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      {...props}
    >
      {children}
    </Base.SidebarSeparator>
  );
}

function SidebarItem({
  className,
  style,
  children,
  ...props
}: ComponentProps<typeof Base.SidebarItem>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarItem
      className={cn(itemVariants({ variant: 'link', highlight: depth >= 1 }), className)}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      {...props}
    >
      {children}
    </Base.SidebarItem>
  );
}

function SidebarFolderTrigger({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderTrigger>) {
  const { depth, collapsible } = Base.useFolder()!;

  return (
    <Base.SidebarFolderTrigger
      className={(state) =>
        cn(
          itemVariants({ variant: collapsible ? 'button' : null }),
          'w-full',
          typeof className === 'function' ? className(state) : className,
        )
      }
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderTrigger>
  );
}

function SidebarFolderLink({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderLink>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderLink
      className={cn(itemVariants({ variant: 'link', highlight: depth > 1 }), 'w-full', className)}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderLink>
  );
}

function SidebarFolderContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Base.SidebarFolderContent>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderContent
      className={(state) =>
        cn(
          'relative flex flex-col gap-0.5 pt-0.5',
          depth === 1 &&
            "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-fd-border before:inset-s-2.5",
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    >
      {children}
    </Base.SidebarFolderContent>
  );
}

function SidebarTabsDropdown({
  tabs,
  placeholder,
  ...props
}: {
  placeholder?: ReactNode;
  tabs: LayoutTab[];
} & ComponentProps<'button'>) {
  const [open, setOpen] = useState(false);
  const { closeOnRedirect } = useSidebar();
  const pathname = usePathname();
  const path = useTreePath();

  const selected = useMemo(() => {
    return tabs.findLast((item) => isLayoutTabActive(item, path, pathname));
  }, [tabs, path, pathname]);

  const onClick = () => {
    closeOnRedirect.current = false;
    setOpen(false);
  };

  const item = selected ? (
    <>
      <div className="size-9 shrink-0 empty:hidden md:size-5">{selected.icon}</div>
      <div>
        <p className="text-sm font-medium">{selected.title}</p>
        <p className="text-sm text-fd-muted-foreground empty:hidden md:hidden">
          {selected.description}
        </p>
      </div>
    </>
  ) : (
    placeholder
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {item && (
        <PopoverTrigger
          {...props}
          className={cn(
            'flex items-center gap-2 rounded-lg p-2 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[popup-open]:bg-fd-accent data-[popup-open]:text-fd-accent-foreground',
            props.className,
          )}
        >
          {item}
          <ChevronsUpDown className="shrink-0 ms-auto size-4 text-fd-muted-foreground" />
        </PopoverTrigger>
      )}
      <PopoverContent className="flex flex-col gap-1 w-(--anchor-width) p-1 fd-scroll-container">
        {tabs.map((item) => {
          const isActive = selected && item.url === selected.url;
          if (!isActive && item.unlisted) return;

          return (
            <Link
              key={item.url}
              href={item.url}
              onClick={onClick}
              {...item.props}
              className={cn(
                'flex items-center gap-2 rounded-lg p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground',
                item.props?.className,
              )}
            >
              <div className="shrink-0 size-9 md:mb-auto md:size-5 empty:hidden">{item.icon}</div>
              <div>
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-[0.8125rem] text-fd-muted-foreground mt-1 empty:hidden">
                  {item.description}
                </p>
              </div>

              <Check
                className={cn(
                  'shrink-0 ms-auto size-3.5 text-fd-primary',
                  !isActive && 'invisible',
                )}
              />
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

function getItemOffset(depth: number) {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

export const SidebarPageTree = createPageTreeRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator,
});

export const SidebarLinkItem = createLinkItemRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
});
