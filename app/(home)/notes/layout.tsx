import { notesSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { NotesNavigation } from './notes-navigation';
import '@/components/site/notes.css';

export default function Layout({ children }: LayoutProps<'/notes'>) {
  return (
    <div className="notes-layout">
      <DocsLayout
        tree={notesSource.getPageTree()}
        nav={{ enabled: false }}
        links={[]}
        themeSwitch={{ enabled: false }}
        containerProps={{ className: 'notes-docs-layout' }}
      >
        <NotesNavigation />
        {children}
      </DocsLayout>
    </div>
  );
}
