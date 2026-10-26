import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ImgHTMLAttributes } from 'react';

function ContentImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  if (props.width && props.height) {
    const Image = defaultMdxComponents.img;
    return <Image {...props} alt={props.alt ?? ''} />;
  }

  // Remote Markdown images have no build-time dimensions; native sizing keeps their aspect ratio.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt ?? ''} loading="lazy" decoding="async" />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: ContentImage,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
