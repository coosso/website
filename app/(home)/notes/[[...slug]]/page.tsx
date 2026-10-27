import { getNotePage, getPageImageUrl, getPageMarkdownUrl, notesSource } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { ThreadsBackground } from '@/components/react-bits';

function noteTitle(page: NonNullable<ReturnType<typeof getNotePage>>) {
  return page.data.title || page.path.split('/').at(-1)?.replace(/\.mdx?$/i, '') || '笔记';
}

export default async function Page(props: PageProps<'/notes/[[...slug]]'>) {
  const params = await props.params;
  const page = getNotePage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} className="notes-document">
      <header className="notes-document-header">
        <div className="notes-header-threads" aria-hidden="true"><ThreadsBackground /></div>
        <p className="site-eyebrow notes-document-eyebrow">FIELD NOTES / 知识笔记</p>
        <DocsTitle className="notes-document-title">{noteTitle(page)}</DocsTitle>
        <DocsDescription className="notes-document-description">{page.data.description}</DocsDescription>
      </header>
      <div className="notes-document-actions">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/notes/${page.path}`}
        />
      </div>
      <DocsBody className="notes-document-body">
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(notesSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return notesSource.generateParams();
}

export async function generateMetadata(props: PageProps<'/notes/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = getNotePage(params.slug);
  if (!page) notFound();

  return {
    title: noteTitle(page),
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
