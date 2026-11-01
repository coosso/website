'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { GitBranch, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import type * as PageTree from 'fumadocs-core/page-tree';
import { SidebarProvider, SidebarTrigger, useSidebar } from 'fumadocs-ui/components/sidebar/base';
import { Magnet } from '@/components/react-bits';
import { useEffects } from './effects-provider';
import { gitConfig } from '@/lib/shared';
import { initialHeaderScroll, isHeaderScrollEnabled, updateHeaderScroll } from './header-scroll';
import { MobileNavigation } from './mobile-navigation';

const links = [
  { href: '/', label: '首页', code: '01' },
  { href: '/blog', label: '博客', code: '02' },
  { href: '/notes', label: '笔记', code: '03' },
  { href: '/about', label: '关于', code: '04' },
];

const desktopQuery = '(min-width: 768px)';
const subscribeDesktop = (callback: () => void) => {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const isDesktop = () => window.matchMedia(desktopQuery).matches;
const serverDesktop = () => false;

export function SiteHeader({ tree }: { tree: PageTree.Root }) {
  return <SidebarProvider><HeaderContent tree={tree} /></SidebarProvider>;
}

function HeaderContent({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { setOpenSearch } = useSearchContext();
  const { hydrated } = useEffects();
  const [compact, setCompact] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktop, serverDesktop);
  const { open, setOpen } = useSidebar();
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const dark = !hydrated || resolvedTheme !== 'light';
  const scrollEnabled = isHeaderScrollEnabled(pathname);

  useEffect(() => {
    if (!desktop || !scrollEnabled) return;
    const scrollPosition = () => Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
    let state = initialHeaderScroll(scrollPosition());
    let frame = 0;
    const update = () => {
      frame = 0;
      state = updateHeaderScroll(state, scrollPosition());
      setCompact(state.compact);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    frame = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname, desktop, scrollEnabled]);

  return (
    <>
    <header className="site-header" data-compact={desktop && scrollEnabled && compact ? 'true' : 'false'}>
      <div className="site-header-frame">
        <div className="site-header-inner">
          <Link href="/" aria-label="可塑性空间，首页" className="site-brand">
            <span className="site-brand-symbol" aria-hidden="true">c<span>.</span></span>
            <span className="site-brand-copy">可塑性空间<small>COOSSO / SPACE</small></span>
          </Link>
          <nav aria-label="主导航" className="site-desktop-nav">
            {links.map(link => <Magnet key={link.href}><Link href={link.href} aria-current={active(link.href) ? 'page' : undefined} className="site-nav-link"><span className="site-nav-code">{link.code}</span>{link.label}</Link></Magnet>)}
          </nav>
          <div className="site-header-actions">
            <button type="button" className="site-icon-button" aria-label="搜索文章与笔记" onClick={() => { setOpen(false); setOpenSearch(true); }}><Search size={18} /></button>
            <button type="button" className="site-icon-button" aria-label={dark ? '切换浅色主题' : '切换深色主题'} onClick={() => setTheme(dark ? 'light' : 'dark')}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <a href={`https://github.com/${gitConfig.user}`} target="_blank" rel="noreferrer" className="site-icon-button site-header-github" aria-label="GitHub（新窗口）"><GitBranch size={18} /></a>
            <SidebarTrigger ref={menuButtonRef} className="site-icon-button site-menu-toggle" aria-label={open ? '关闭导航' : '打开导航'}>{open ? <X size={20} /> : <Menu size={20} />}</SidebarTrigger>
          </div>
        </div>
      </div>
    </header>
    <MobileNavigation tree={tree} links={links} triggerRef={menuButtonRef} dark={dark}
      onToggleTheme={() => setTheme(dark ? 'light' : 'dark')}
      onSearch={() => { setOpen(false); setOpenSearch(true); }}
      githubUrl={`https://github.com/${gitConfig.user}`} />
    </>
  );
}
