import React from "react";

import type { MDXComponents } from "mdx/types";
import { cx } from "class-variance-authority";

import { ReactElement } from "react";
import { CodeBlock, extractCodeEl, extractLang } from "./src/components/code-block";
import { codeToHtml } from "shiki";
import {
  Heading,
  Link,
  Paragraph,
  UnorderedList,
  ListItem,
} from "./src/components/typography";
import { Divider } from "./src/components/divider";
import { Video } from "./src/components/video";
import { Image } from "./src/components/image/image-with-dialog";
import { PersonLink } from "./src/components/person-link";
import { Callout } from "./src/components/callout";


const myComponents: MDXComponents = {
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} className="my-3" />,
  h3: (props) => <Heading level={3} {...props} className="my-3" />,
  h4: (props) => <Heading level={4} {...props} className="my-2" />,
  h5: (props) => <Heading level={5} {...props} className="my-1" />,
  h6: (props) => <Heading level={6} {...props} />,
  p: ({ className = "", ...rest }) => {
    return <Paragraph {...rest} className={cx(`mb-6`, className)} />;
  },
  a: (props) => {
    const { href, children, ...rest } = props;
    // @ts-expect-error - TODO: fix this
    return <Link href={href} {...rest}>{children}</Link>;
  },
  ul: (props) => <UnorderedList {...props} />,
  li: (props) => <ListItem {...props} />,
  hr: (props) => <Divider {...props} />,
  Callout,
  Link,
  Image,
  Video,
  PersonLink,
  // pre: async (props) => {
  //   const isElement = React.isValidElement(props.children);
  //   if (!isElement) {
  //     return <pre {...props} />;
  //   }
  //   const codeEl = extractCodeEl(props.children as ReactElement);
  //   const lang = extractLang(codeEl?.props.className as string);
  //   const code = await codeToHtml(codeEl?.props.children as string, {
  //     lang,
  //     themes: {
  //       light: "catppuccin-latte",
  //       dark: "dracula-soft",
  //     },
  //   });

  //   return <CodeBlock code={code} className="sheen-ring rounded-md" />;
  // },
};

export function useMDXComponents(builtInComponents: MDXComponents): MDXComponents {
  return {
    ...builtInComponents,
    ...myComponents,
  };
}