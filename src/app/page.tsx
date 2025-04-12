import { Heading, Paragraph, Link } from "@/components/typography";
import { PersonLink } from "@/components/person-link";
import { Clock } from "@/components/clock";
import { getPostsByCategory } from "@/lib/posts";
import { DynamicGrid } from "@/components/posts/grid";
import { Divider } from "@/components/divider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { PostList } from "@/components/posts/list";

export default function Page() {
  const posts = [...getPostsByCategory("projects")];

  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.publishedAt || Date.now()).getTime() -
      new Date(a.publishedAt || Date.now()).getTime()
    );
  });
  return (
    <>
      <header>
        <Heading level={1}>preston bourne</Heading>
        <Paragraph className={"my-2"}>
          ~ currently: product engineering at{" "}
          <PersonLink name="hedra" url="https://www.hedra.com" />
          <br /> ~ previously:{" "}
          <PersonLink name="ibm" url="https://www.ibm.com" />,{" "}
          <PersonLink name="hashicorp" url="https://www.hashicorp.com" />,{" "}
          <PersonLink name="cornell" url="https://www.cornell.edu" />,{" "}
          <PersonLink
            name="parsons"
            url="https://www.newschool.edu/parsons/bfa-design-technology/"
          />
          <br /> ~ constantly: pursuing beautiful, performant software
        </Paragraph>
        <div className="flex flex-row gap-3 my-4 items-center text-sm sm:text-base">
          <Paragraph>
            <Link href="https://x.com/prestonb0urne" target="_blank">
              x
            </Link>
          </Paragraph>
          <Link
            href="https://www.linkedin.com/in/prestonbourne/"
            target="_blank"
          >
            linkedin
          </Link>
          <Link href="https://github.com/prestonbourne" target="_blank">
            github
          </Link>
          <span>|</span>
          <Clock />
        </div>
      </header>
      <Divider className="my-4" />
      <main className="w-full mx-auto flex flex-col gap-6">
        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="work">work</TabsTrigger>
            <TabsTrigger value="notes">notes</TabsTrigger>
          </TabsList>
          <TabsContent value="work">
            <DynamicGrid posts={sortedPosts} />
          </TabsContent>
          <TabsContent value="notes">
            <PostList category="notes" />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
