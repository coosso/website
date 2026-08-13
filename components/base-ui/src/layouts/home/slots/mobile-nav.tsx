'use client';

import { cn } from '@base-ui/utils/cn';
import { buttonVariants } from '@base-ui/components/ui/button';
import {
  SidebarDrawerOverlay,
  SidebarDrawerContent,
  SidebarViewport,
  SidebarTrigger,
} from '@base-ui/components/sidebar/base';
import { LinkItem } from '@base-ui/layouts/shared';
import { Languages, SidebarIcon } from 'lucide-react';
import { useHomeLayout } from '..';
import { SidebarPageTree, SidebarLinkItem } from '@base-ui/layouts/docs/slots/sidebar';

export function MobileNavDrawer() {
  const { menuItems, slots } = useHomeLayout();
  const iconLinks = menuItems.filter((item) => item.type === 'icon');

  return (
    <>
      <SidebarDrawerOverlay className="fixed z-40 inset-0 backdrop-blur-xs data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out" />
      <SidebarDrawerContent className="fixed text-[0.9375rem] flex flex-col shadow-lg border-s inset-e-0 inset-y-0 w-[85%] max-w-[380px] z-40 bg-fd-background data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out">
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
        </div>
        <SidebarViewport>
          <div className="flex flex-col gap-0.5">
            {menuItems
              .filter((v) => v.type !== 'icon')
              .map((item, i, list) => (
                <SidebarLinkItem
                  key={i}
                  item={item}
                  className={cn(i === list.length - 1 && 'mb-4')}
                />
              ))}
            <SidebarPageTree />
          </div>
        </SidebarViewport>
      </SidebarDrawerContent>
    </>
  );
}
