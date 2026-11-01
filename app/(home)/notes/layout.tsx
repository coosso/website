import { notesSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import '@/components/site/notes.css';

export default function Layout({ children }: LayoutProps<'/notes'>) {
  return (
    <div className="notes-layout">
      <DocsLayout
        tree={notesSource.getPageTree()}
        sidebar={{ drawer: false }}
        nav={{ enabled: false }}
        links={[]}
        themeSwitch={{ enabled: false }}
        containerProps={{ className: 'notes-docs-layout' }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
