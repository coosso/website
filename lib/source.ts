import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { notesContentRoute, notesImageRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

const notes = defineDocs({
  dir: 'content/notes',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/notes',
  source: notes.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

/**
 * Look up a note page by slug, tolerant of Next.js's inconsistent slug
 * encoding. Page components receive percent-encoded path segments while
 * `generateMetadata` (and route handlers) receive decoded ones; fumadocs
 * keys pages by the encoded form, so fall back to the encoded form when
 * the direct lookup misses.
 */
export function getNotePage(slug: string[] | undefined) {
  const page = source.getPage(slug);
  if (page) return page;
  return source.getPage(slug?.map((segment) => encodeURIComponent(segment)));
}

export function getPageImageUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: '/' + [page.locale, ...notesImageRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: '/' + [page.locale, ...notesContentRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
