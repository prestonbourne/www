import { formatISOToDate } from "@/lib/index";
import { TextWithIcon } from "@/components/text-with-icon";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { Divider } from "@/components/divider";
import { Heading } from "@/components/typography";
import { Paragraph as Body } from "@/components/typography/paragraph";
import { ViewCounter } from "./view-counter";
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Breadcrumb } from "./breadcrumb";


type PostLayoutProps = React.PropsWithChildren<{
  slug: string;
}>;


export async function PostLayout({ children, slug }: PostLayoutProps) {
  const post = await getPostBySlug(slug);
  if (!post) {
    return notFound();
  }
  return (
    <>
      <header>
        <Breadcrumb />
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
            {post.slug && <ViewCounter slug={post.slug} shouldInc={true} />}
          </div>
        </div>
      </header>
      <Divider className="mt-4 mb-7" />
      <main>
        {children}
      </main>
    </>
  );
}
