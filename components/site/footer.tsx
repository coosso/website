import Link from 'next/link';
import { ArrowUpRight, Asterisk } from 'lucide-react';
import { DecryptedText, Magnet, ShinyText } from '@/components/react-bits';
import { gitConfig } from '@/lib/shared';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer-main">
          <div>
            <Link href="/" className="site-footer-logo"><Asterisk aria-hidden="true" /><ShinyText text="保持好奇，继续构建。" /></Link>
            <p className="site-muted">一个持续生长的个人技术空间。</p>
          </div>
          <Magnet><Link href="/about" className="site-link">让想法发生 <ArrowUpRight size={18} /></Link></Magnet>
        </div>
        <div className="site-footer-bottom">
          <span className="site-mono"><DecryptedText text="COOSSO © 2026" /><span className="site-footer-dot"> / </span>BUILT WITH CURIOSITY</span>
          <div><a href={`https://github.com/${gitConfig.user}`} target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://reactbits.dev" target="_blank" rel="noreferrer">React Bits ↗</a><span className="site-footer-status"><i /> 持续构建中</span></div>
        </div>
      </div>
    </footer>
  );
}
