import { defineConfig } from 'fumadocs-mdx/config';

export default defineConfig({
  mdxOptions: {
    // Remote article hosts can be unavailable during a build. Render those
    // images in the browser instead of fetching their dimensions at build time.
    remarkImageOptions: { external: false },
  },
});
