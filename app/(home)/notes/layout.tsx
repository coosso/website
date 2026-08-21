import { notesSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/notes'>) {
  return (
    <DocsLayout tree={notesSource.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
