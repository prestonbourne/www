import { Link } from "@/components/typography/link";
import React from "react";
import { trimIsoToDate } from "@/lib";
import * as FadeIn from "@/components/motion";
import { Post } from "@/lib/types";

export type PostListProps = {
  posts: Post[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <FadeIn.List className="flex-1 h-full flex flex-col gap-2">
      {posts.map((post) => {
        const href = post.externalURL || `/${post.type}/${post.slug}`;
        return (
          <FadeIn.Item
            key={post.slug}
            className="flex flex-row justify-between items-center my-2"
          >
            <Link href={href}>
              <p className="truncate max-w-[240px] md:max-w-[520px]">{post.title}</p>
            </Link>
            <p className="mt-0 text-foreground-muted text-xs">
              {post.publishedAt ? trimIsoToDate(post.publishedAt) : "WIP"}
            </p>
          </FadeIn.Item>
        );
      })}
    </FadeIn.List>
  );
};
