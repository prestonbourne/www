import { getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { NextPageProps } from "@/lib/types";

export function getGenerateStaticParams() {
  return () =>
    getPosts().map((post) => ({
      slug: post.slug,
    }));
}

export async function getGenerateMetadata({ params }: NextPageProps) {
  const currentSlug = params.slug;
  const post = getPosts().find(
    (post) => post.slug === currentSlug
  );

  if (!post) return notFound();
  const { title, description } = post;

  return () => ({
    title,
    description,
  });
}