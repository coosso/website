import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { notesContentRoute, notesImageRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

// ---------- 笔记集合 ----------

const notes = defineDocs({
  dir: 'content/notes',
  docs: {
    schema: pageSchema.partial(),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const notesSource = loader({
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
  const page = notesSource.getPage(slug);
  if (page) return page;
  return notesSource.getPage(slug?.map((segment) => encodeURIComponent(segment)));
}

export function getPageImageUrl(page: (typeof notesSource)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: '/' + [page.locale, ...notesImageRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export function getPageMarkdownUrl(page: (typeof notesSource)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: '/' + [page.locale, ...notesContentRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export async function getLLMText(page: (typeof notesSource)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------- 博客集合 ----------
// 与文档集合一致的 fumadocs 内容管线，在前端元数据上扩展了
// date / author / tags 等博客专属字段。

const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: pageSchema.extend({
      date: z.string(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      image: z.string().optional(),
      top: z.boolean().optional(),
      related: z.array(z.string()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
});

export type BlogPost = (typeof blogSource)['$inferPage'];

/**
 * Look up a blog post by slug, tolerant of Next.js's inconsistent slug
 * encoding (same caveat as `getNotePage`).
 */
export function getBlogPost(slug: string) {
  return blogSource.getPage([slug]) ?? blogSource.getPage([encodeURIComponent(slug)]);
}

/** 按发布日期倒序返回所有博客文章。 */
export function getBlogPosts(): BlogPost[] {
  return blogSource
    .getPages()
    .slice()
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** 返回所有去重后的标签，按字典序排序。 */
export function getBlogTags(): string[] {
  const tags = new Set<string>();
  for (const post of blogSource.getPages()) {
    for (const tag of post.data.tags ?? []) {
      tags.add(tag);
    }
  }
  return [...tags].sort();
}
