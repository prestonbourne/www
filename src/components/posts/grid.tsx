"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Post } from "@/lib/types";
import { cx } from "class-variance-authority";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import Image from "next/image";
import { Heading } from "@/components/typography";

interface DynamicGridProps {
  posts: Post[];
}

const COLUMNS = 2;
const BASE_ITEM_SIZE = "1fr 1fr";
const TOTAL_GRID_SIZE = 12;

export function DynamicGrid({ posts }: DynamicGridProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null
  );
  const [hoverSize, setHoverSize] = useState(6);
  const [gapSize, setGapSize] = useState(8);

  // Grid layout calculations
  const getRowSizes = () => {
    if (hovered === null) return BASE_ITEM_SIZE;
    const { row } = hovered;
    const nonHoveredSize = (TOTAL_GRID_SIZE - hoverSize) / COLUMNS;
    const rows = [0, 1]
      .map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
    return rows;
  };

  const getColSizes = () => {
    if (hovered === null) return BASE_ITEM_SIZE;
    const { col } = hovered;
    const nonHoveredSize = (TOTAL_GRID_SIZE - hoverSize) / COLUMNS;
    const cols = [0, 1]
      .map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
    return cols;
  };

  return (
    <div
      style={{
        // @ts-expect-error - custom css variables
        "--grid-rows": getRowSizes(),
        "--grid-cols": getColSizes(),
        "--gap": `${gapSize}px`,
      }}
      className="w-full grid h-[400px] transition-all duration-300 ease-in-out [grid-template-rows:var(--grid-rows)] [grid-template-columns:var(--grid-cols)] [gap:var(--gap)]"
    >
      {posts.map((post, index) => {
        const row = Math.floor(index / COLUMNS);
        const col = index % COLUMNS;

        return (
          <Item
            key={post.slug}
            post={post}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}
    </div>
  );
}


type ItemProps = {
  post: Post;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const Item: React.FC<ItemProps> = ({
  post,
  onMouseEnter,
  onMouseLeave,
}) => {
  const containerClass = cx(
    "cursor-pointer block",
    "relative overflow-hidden",
    "group/card",
    "h-full w-full"
  );

  const iconClassContainer = cx(
    `text-xs flex items-center gap-1 text-foreground bg-black shadow-dense`,
    "opacity-0 -translate-y-3 transition-all border border-foreground-muted/40",
    "group-hover/card:opacity-100 group-hover/card:translate-y-0 rounded-lg"
  );

  const descClass = cx(
    `text-sm items-center text-foreground-muted px-1 py-1`,
    "opacity-0 translate-y-3 transition-all",
    "group-hover/card:opacity-100 group-hover/card:translate-y-0"
  );


  const link = post.externalURL || post.slug;

  return (
    <motion.li
      className={containerClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {link && (
        <NextLink href={link!} className="absolute block w-full h-full z-10" ></NextLink>
      )}
      <div className="relative w-full h-full">
        <Image
          fill
          loading="eager"
          src={post.media?.image!}
          alt={`${post.title} cover`}
          className={"object-cover"}
        />
      </div>
      <div className={cx(iconClassContainer, "absolute top-2 right-2", "p-1")}>
        <ArrowTopRightIcon />
      </div>
      <div className={cx(descClass, "absolute bottom-0 w-full ease-in")}>
        <Heading
          level={6}
          render="h3"
          className="pl-2 pb-0 opacity-0 group-hover/card:opacity-100"
        >
          {post.title}
        </Heading>
      </div>
    </motion.li>
  );
};
