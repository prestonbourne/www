/* 
    Nextjs does not have a built-in way to define types for server components
*/
export type NextPageProps<SlugType = string> = React.PropsWithChildren<{
  params: { slug: SlugType };
  searchParams?: { [key: string]: string | string[] | undefined };
}>;

export type PostNextMetadata = {
  title: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  imageURL?: string;
  externalURL?: string;
  tags?: string[];
}

export type PostType = "notes" | "work";

export type Post = PostNextMetadata & {
  slug: string;
  type: PostType;
  content: string;

  media?: {
    image?: string;
    video?: string;
    audio?: string;
  };

  readingTimeMS?: number;

  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  audience?: {
    likes?: number;
    views?: number;
    comments?: number;
  };

  related: Post['slug'][];
};