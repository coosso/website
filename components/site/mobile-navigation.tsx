'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitBranch, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useRef, type MouseEvent, type RefObject } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { SidebarDrawerContent, SidebarDrawerOverlay, SidebarTrigger, SidebarViewport, useSidebar } from 'fumadocs-ui/components/sidebar/base';
import { SidebarPageTree } from 'fumadocs-ui/layouts/docs/slots/sidebar';

type NavLink = { href: string; label: string; code: string };

/** Uses the same drawer and page-tree primitives as Fumadocs' original mobile navigation. */
export function MobileNavigation({ tree, links, triggerRef, dark, onToggleTheme, onSearch, githubUrl }: {
  tree: PageTree.Root;
  links: NavLink[];
  triggerRef: RefObject<HTMLButtonElement | null>;
  dark: boolean;
  onToggleTheme: () => void;
  onSearch: () => void;
  githubUrl: string;
}) {
  const pathname = usePathname();
  const { open, setOpen } = useSidebar();
  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const followLink = useRef(false);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    followLink.current = false;
    const frame = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
        .filter(element => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden');
      if (!items.length) { event.preventDefault(); return; }
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawerRef.current?.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawerRef.current?.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onDesktop = (event: MediaQueryListEvent) => { if (event.matches) setOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
      if (!followLink.current && window.location.pathname === pathname && !desktop.matches && trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open, pathname, setOpen, triggerRef]);

  const follow = () => { followLink.current = true; setOpen(false); };
  const followNote = (event: MouseEvent<HTMLElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('[data-icon]')) return;
    const link = target?.closest('a[href]');
    if (link && link.getAttribute('target') !== '_blank') follow();
  };
  return (
    <>
      <SidebarDrawerOverlay className="site-sheet-backdrop data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out" />
      <SidebarDrawerContent ref={drawerRef} role="dialog" aria-modal="true" aria-label="站点导航" aria-hidden={!open} inert={!open}
        className="site-mobile-sheet data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out">
        <div className="site-mobile-sheet-header">
          <Link href="/" aria-label="可塑性空间，首页" className="site-brand" onClick={follow}>
            <span className="site-brand-symbol" aria-hidden="true">c<span>.</span></span>
          </Link>
          <div className="site-mobile-sheet-actions">
            <button type="button" className="site-icon-button" aria-label="搜索文章与笔记" onClick={() => { followLink.current = true; onSearch(); }}><Search size={18} /></button>
            <button type="button" className="site-icon-button" aria-label={dark ? '切换浅色主题' : '切换深色主题'} onClick={onToggleTheme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="site-icon-button" aria-label="GitHub（新窗口）"><GitBranch size={18} /></a>
            <SidebarTrigger ref={closeRef} className="site-icon-button" aria-label="关闭导航"><X size={20} /></SidebarTrigger>
          </div>
        </div>
        <SidebarViewport className="site-mobile-sheet-viewport">
          <nav aria-label="移动导航" className="site-mobile-sheet-links">
            {links.map(link => <Link key={link.href} href={link.href} className="site-mobile-sheet-link"
              aria-current={(link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'page' : undefined}
              onClick={follow}><span className="site-nav-code">{link.code}</span>{link.label}</Link>)}
          </nav>
          {(pathname === '/notes' || pathname.startsWith('/notes/')) && (
            <section className="site-mobile-sheet-notes" aria-label="笔记目录" onClick={followNote}>
              <TreeContextProvider tree={tree}><SidebarPageTree /></TreeContextProvider>
            </section>
          )}
        </SidebarViewport>
      </SidebarDrawerContent>
    </>
  );
}
