"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { UnstyledLink } from "@/components/typography";
import React from "react";

export const Breadcrumb = () => {
  const pathname = usePathname();

  const paths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.replace(/-/g, " "));

  return (
    <nav className="mb-4 flex w-full items-center gap-1 align-middle font-normal text-small">
      <UnstyledLink href="/">home</UnstyledLink>
      <ChevronRightIcon />
      {paths.map((path, index) => {
        const href = `/${paths
          .slice(0, index + 1)
          .join("/")
          .toLowerCase()}`;

        const isLast = index === paths.length - 1;

        // If there are exactly 2 paths and this is the first one (index 0)
        if (paths.length === 2 && index === 0) {
          return (
            <React.Fragment key={path}>
              <UnstyledLink href={`/?postsTab=${path}`}>{path}</UnstyledLink>
              <ChevronRightIcon />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={path}>
            {isLast ? (
              <span>{path}</span>
            ) : (
              <UnstyledLink href={href}>{path}</UnstyledLink>
            )}
            {index < paths.length - 1 && <ChevronRightIcon />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
