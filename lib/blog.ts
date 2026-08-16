import { loader } from 'fumadocs-core/source';
import { defineDocs } from 'fumadocs-mdx/macro';
import { pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

// 博客集合：与文档集合一致的 fumadocs 内容管线，
// 在前端元数据上扩展了 date / author / tags 等博客专属字段。
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
