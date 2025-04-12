/* 
    Nextjs does not have a built-in way to define types for server components
*/
export interface NextPageProps<SlugType = string> {
  params: { slug: SlugType };
  searchParams?: { [key: string]: string | string[] | undefined };
}



export type Post = {
  title: string;
  slug: string;
  content: string;
  tags?: string[];
  description?: string;
  externalURL?: string;

  publishedAt?: string;
  updatedAt?: string;

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