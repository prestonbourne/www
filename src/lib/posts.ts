import fs from "fs";
import path from "path";
import { Post, PostNextMetadata, PostType } from "./types";
import { createSSRClient } from "@/lib/supabase/server-client";

if (typeof window !== "undefined" || typeof document !== "undefined") {
  throw new Error("This file should not be imported on the client");
}

async function extractPostMetadata(
  filePath: string
): Promise<{ post: Omit<Post, "audience"> } | { error: Error }> {
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");

    const metadataMatch = rawContent.match(
      /export const metadata = ({[\s\S]*?});/
    );
    if (!metadataMatch) {
      return { error: new Error(`No metadata found in ${filePath}`) };
    }

    const metadataStr = metadataMatch[1];
    const metadata = eval(`(${metadataStr})`) as PostNextMetadata;

    if (!metadata.title) {
      return {
        error: new Error(`Missing required metadata fields in ${filePath}`),
      };
    }

    const slug = path.basename(path.dirname(filePath));
    const pathParts = filePath.split(path.sep);
    const postsIndex = pathParts.indexOf("(posts)");
    const type = pathParts[postsIndex + 1] as PostType;

    const post: Omit<Post, "audience"> = {
      title: metadata.title,
      description: metadata.description ?? "",
      publishedAt: metadata.publishedAt,
      updatedAt: metadata.updatedAt,
      imageURL: metadata.imageURL,
      externalURL: metadata.externalURL,
      tags: metadata.tags,
      type,
      slug,
      content: rawContent,
      readingTimeMS: calculateReadingTimeMS(rawContent),
      media: {
        image: metadata.imageURL,
      },
      related: [],
    };

    return { post };
  } catch (error) {
    return {
      error: new Error(`Failed to read or parse the file at ${filePath}`, {
        cause: error,
      }),
    };
  }
}

export const calculateReadingTimeMS = (
  content: string,
  wordsPerMinute: number = 220
) => {
  const words = content.split(/\s/g).length;
  const minutes = words / wordsPerMinute;
  const readTime = Math.floor(minutes * 60 * 1000);
  return readTime;
};

const getMdxPagePaths = (
  dir: string
): { paths: string[] } | { error: Error } => {
  try {
    const allFiles = fs.readdirSync(dir);
    const mdxFiles: string[] = [];

    for (const f of allFiles) {
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const pagePath = path.join(fullPath, "page.mdx");
        if (fs.existsSync(pagePath)) {
          mdxFiles.push(pagePath);
        }
        const subDirResult = getMdxPagePaths(fullPath);
        if ("paths" in subDirResult) {
          mdxFiles.push(...subDirResult.paths);
        }
      }
    }

    return { paths: mdxFiles };
  } catch (error) {
    return {
      error: new Error(`Failed to read directory at ${dir}`, { cause: error }),
    };
  }
};

const allCache = new Map<string, Omit<Post, "audience">[]>();
const postCache = new Map<string, Omit<Post, "audience">>();
export async function getPosts(): Promise<Omit<Post, "audience">[]> {
  if (allCache.has("all_posts")) {
    return allCache.get("all_posts")!;
  }

  const notesDir = path.join(process.cwd(), "src", "app", "(posts)", "notes");
  const workDir = path.join(process.cwd(), "src", "app", "(posts)", "work");

  const notePathsResult = getMdxPagePaths(notesDir);
  const workPathsResult = getMdxPagePaths(workDir);

  if ("error" in notePathsResult) {
    console.error(
      `[lib/posts] Failed to get note paths: ${notePathsResult.error}`
    );
    return [];
  }

  if ("error" in workPathsResult) {
    console.error(
      `[lib/posts] Failed to get work paths: ${workPathsResult.error}`
    );
    return [];
  }

  const posts = await Promise.all([
    ...notePathsResult.paths.map(async (filePath) => {
      const result = await extractPostMetadata(filePath);
      if ("error" in result) {
        console.error(
          `[lib/posts] Failed to extract post metadata for ${filePath}: ${result.error}`
        );
        return null;
      }
      return {
        ...result.post,
        type: "notes" as const,
      } as Omit<Post, "audience">;
    }),
    ...workPathsResult.paths.map(async (filePath) => {
      const result = await extractPostMetadata(filePath);
      if ("error" in result) {
        console.error(result.error);
        return null;
      }
      return {
        ...result.post,
        type: "work" as const,
      } as Omit<Post, "audience">;
    }),
  ]);

  const res = posts.filter(
    (post): post is Omit<Post, "audience"> => post !== null
  );
  allCache.set("all_posts", res);
  return res;
}

export async function getPostBySlug(
  slug: string
): Promise<Omit<Post, "audience"> | null> {
  if (postCache.has(`post_${slug}`)) {
    return postCache.get(`post_${slug}`)!;
  }

  const posts = await getPosts();
  const res = posts.find((post) => post.slug === slug) ?? null;
  if (res) {
    postCache.set(`post_${slug}`, res);
  } else {
    console.error(`[lib/posts] Failed to get post by slug: ${slug}`);
  }
  return res;
}

export async function getPostViews(
  slug: string
): Promise<{ views: number } | { error: Error }> {
  const supabase = await createSSRClient();
  const { data, error } = await supabase
    .from("posts")
    .select("audience_views")
    .eq("slug", slug)
    .single();

  if (error) {
    return { error: new Error("Failed to fetch post views", { cause: error }) };
  }

  return { views: data?.audience_views ?? 0 };
}
