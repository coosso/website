'use client';

import { BookOpenText, PanelLeft } from 'lucide-react';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';

/** The native sidebar provider owns both drawer state and keyboard behavior. */
export function NotesNavigation() {
  const { slots } = useDocsLayout();
  const SidebarTrigger = slots.sidebar.trigger;

  return (
    <div className="notes-navigation">
      <span className="notes-navigation-label"><BookOpenText size={15} aria-hidden="true" /><span>知识库<span className="notes-navigation-english"> / NOTES</span></span></span>
      <SidebarTrigger className="notes-sidebar-trigger" aria-label="打开笔记目录">
        <PanelLeft size={17} aria-hidden="true" />
        <span>笔记目录</span>
      </SidebarTrigger>
    </div>
  );
}
