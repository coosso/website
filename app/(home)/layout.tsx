import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </HomeLayout>
  );
}
