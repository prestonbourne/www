import { formatISOToDate } from "@/lib/index";
import { NextPageProps } from "@/lib/types";
import { TextWithIcon } from "@/components/text-with-icon";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { Divider } from "@/components/divider";
import { Heading } from "@/components/typography";
import { Paragraph as Body } from "@/components/typography/paragraph";
import { getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { ViewCounter } from "./view-counter";

type PostPageProps = NextPageProps & {
  category: string;
};

export async function PostPage({ params, category }: PostPageProps) {
  const currentSlug = params.slug;
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === currentSlug);
  if (!post) return notFound();

  return (
    <>
      <header>
        <Heading level={1}>{post.title}</Heading>
        <Body className="text-sm py-2 text-sub-text">{post.description}</Body>
        <div className="flex justify-between my-2 py-0 items-center">
          {post.publishedAt && (
            <TextWithIcon
              text={formatISOToDate(post.publishedAt)}
              Icon={CalendarIcon}
            />
          )}
          <div className="flex gap-4 my-0 py-0 items-center">
            {post.readingTimeMS && (
              <TextWithIcon
                text={`${Math.floor(post.readingTimeMS / 60000)} mins`}
                Icon={ClockIcon}
              />
            )}
            <ViewCounter slug={currentSlug} shouldInc={true} />
          </div>
        </div>
      </header>
      <Divider className="mt-4 mb-7" />
    </>
  );
}
