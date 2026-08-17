import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.7','192.168.1.3'],
  turbopack: {
    resolveAlias: {
      // `fumadocs-ui/mdx` needs the server implementation (real createRelativeLink)
      'fumadocs-ui/mdx': './components/base-ui/src/mdx.server',
    },
  },
};

export default withMDX(config);
