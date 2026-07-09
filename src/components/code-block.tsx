import { ComponentProps, ReactElement } from "react";

type CodeBlockProps = {
  code: string;
} & ComponentProps<"code">;

export const CodeBlock = ({ code, className }: CodeBlockProps) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
};


export const extractLang = (className?: string) => {
  if (!className) return "plaintext";

  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "plaintext";
};

export const extractCodeEl = (
  children: ReactElement<{ children?: ReactElement }>
): ReactElement | null => {
  if (!children) {
    console.error("No children found", children);
    return null;
  }
  if (children.type === "code") {
    return children;
  }

  if (children.type === "pre" && children.props.children) {
    return extractCodeEl(
      children.props.children as ReactElement<{ children?: ReactElement }>
    );
  }

  console.error("No code block found", children);
  return null;
};