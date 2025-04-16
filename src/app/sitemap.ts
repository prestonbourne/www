import { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getPosts();
  const allPostsEntries: MetadataRoute.Sitemap = allPosts.map((post: any) => {
    return {
      // @ts-ignore ts not picking up the correct type at build time
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.type}/${post.slug}`,
    };
  });

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/sketches`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes`,
    },
    ...allPostsEntries,
  ];
}
