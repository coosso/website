'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { GitBranch, Menu, Moon, Pause, Play, Search, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Magnet } from '@/components/react-bits';
import { useEffects } from './effects-provider';
import { gitConfig } from '@/lib/shared';

const links = [
  { href: '/', label: '首页', code: '01' },
  { href: '/blog', label: '博客', code: '02' },
  { href: '/notes', label: '笔记', code: '03' },
  { href: '/about', label: '关于', code: '04' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { setOpenSearch } = useSearchContext();
  const { hydrated, disabled, reduced, toggle } = useEffects();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const dark = !hydrated || resolvedTheme !== 'light';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" aria-label="可塑性空间，首页" className="site-brand">
          <span className="site-brand-symbol" aria-hidden="true">c<span>.</span></span>
          <span className="site-brand-copy">可塑性空间<small>COOSSO / SPACE</small></span>
        </Link>
        <nav aria-label="主导航" className="site-desktop-nav">
          {links.map(link => <Magnet key={link.href}><Link href={link.href} aria-current={active(link.href) ? 'page' : undefined} className="site-nav-link"><span className="site-nav-code">{link.code}</span>{link.label}</Link></Magnet>)}
        </nav>
        <div className="site-header-actions">
          <button type="button" className="site-icon-button" aria-label="搜索文章与笔记" onClick={() => setOpenSearch(true)}><Search size={18} /></button>
          <button type="button" className="site-icon-button" aria-label={dark ? '切换浅色主题' : '切换深色主题'} onClick={() => setTheme(dark ? 'light' : 'dark')}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button type="button" className="site-icon-button site-motion-toggle" aria-label={disabled ? reduced ? '系统已启用减少动态效果' : '播放动效' : '暂停动效'} aria-pressed={disabled} disabled={reduced} onClick={toggle}>{disabled ? <Play size={16} /> : <Pause size={16} />}</button>
          <a href={`https://github.com/${gitConfig.user}`} target="_blank" rel="noreferrer" className="site-icon-button site-header-github" aria-label="GitHub（新窗口）"><GitBranch size={18} /></a>
          <button type="button" className="site-icon-button site-menu-toggle" aria-label={open ? '关闭导航' : '打开导航'} aria-expanded={open} aria-controls="site-mobile-nav" onClick={() => setMenuPath(open ? null : pathname)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <nav id="site-mobile-nav" aria-label="移动导航" className="site-mobile-nav" hidden={!open}>
        {links.map(link => <Link key={link.href} href={link.href} className="site-nav-link" aria-current={active(link.href) ? 'page' : undefined} onClick={() => setMenuPath(null)}><span className="site-nav-code">{link.code}</span>{link.label}<span aria-hidden="true">↗</span></Link>)}
      </nav>
    </header>
  );
}
