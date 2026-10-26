import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <a href="#main-content" className="site-skip-link">跳到内容</a>
      <SiteHeader />
      <main id="main-content" className="site-main">{children}</main>
      <SiteFooter />
    </>
  );
}
