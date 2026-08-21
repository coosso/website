import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { notesSource } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout tree={notesSource.getPageTree()} {...baseOptions()}>
      {children}
    </HomeLayout>
  );
}
