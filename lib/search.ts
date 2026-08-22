import { basename, extname } from 'node:path';
import { findPath, type Root } from 'fumadocs-core/page-tree';
import { type AdvancedIndex } from 'fumadocs-core/search/server';
import type { StructuredData } from 'fumadocs-core/mdx-plugins/remark-structure';
import type { Page } from 'fumadocs-core/source';
import { blogSource, notesSource } from './source';

/** Structural shape of a source that search can index. */
type SearchSource = {
  getPages: () => Page[];
  getPageTree: (locale?: string) => Root;
};

/**
 * The content sources indexed by site search.
 *
 * Add a new source here to make it searchable — index building, breadcrumbs
 * and the search endpoint are all derived from this list. `name` is the label
 * shown as the first breadcrumb segment in search results.
 */
const searchSources: { source: SearchSource; name: string }[] = [
  { source: notesSource, name: '笔记' },
  { source: blogSource, name: '博客' },
];

function isBreadcrumbItem(item: unknown): item is string {
  return typeof item === 'string' && item.length > 0;
}

/**
 * Replica of fumadocs' internal `buildBreadcrumbs`. Breadcrumbs are computed
 * per-source (each source owns its own page tree), so this can't reuse the
 * single-source `createFromSource` helper.
 */
function buildBreadcrumbs(source: SearchSource, name: string, page: Page): string[] | undefined {
  const pageTree = source.getPageTree(page.locale);
  const path = findPath(pageTree.children, (node) => node.type === 'page' && node.url === page.url);
  if (!path) return;

  const breadcrumbs: string[] = [name];
  path.pop();
  for (const segment of path) {
    if (!isBreadcrumbItem(segment.name)) continue;
    breadcrumbs.push(segment.name);
  }
  return breadcrumbs;
}

/**
 * Replica of fumadocs' internal `buildIndexDefault`, plus the per-source
 * `breadcrumbs`/`locale` fields that `createFromSource` would normally add.
 */
async function buildIndex(source: SearchSource, name: string, page: Page): Promise<AdvancedIndex> {
  const data = page.data as Page['data'] & {
    load?: () => Promise<{ structuredData?: StructuredData }>;
  };

  let structuredData = data.structuredData;
  if (typeof structuredData === 'function') structuredData = await structuredData();
  else if (typeof data.load === 'function') {
    structuredData = (await data.load()).structuredData;
  }

  if (!structuredData) {
    throw new Error(
      'Cannot find structured data from page, please define the page to index function.',
    );
  }

  return {
    title: data.title ?? basename(page.path, extname(page.path)),
    description: data.description,
    url: page.url,
    id: page.url,
    structuredData,
    breadcrumbs: buildBreadcrumbs(source, name, page),
    locale: page.locale,
  };
}

/** Build the combined search index across every configured source. */
export async function buildSearchIndexes(): Promise<AdvancedIndex[]> {
  const indexes: AdvancedIndex[] = [];
  for (const { source, name } of searchSources) {
    for (const page of source.getPages()) {
      indexes.push(await buildIndex(source, name, page));
    }
  }
  return indexes;
}
