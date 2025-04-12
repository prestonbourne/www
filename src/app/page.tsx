import { Heading, Paragraph, Link } from "@/components/typography";
import { PersonLink } from "@/components/person-link";
import { Clock } from "@/components/clock";
import { getPostsByCategory } from "@/lib/posts";
import { DynamicGrid } from "@/components/posts/grid";
import { Divider } from "@/components/divider";
import Image from "next/image";

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
        <div className="relative isolate w-18 h-18 -top-12 flex items-center justify-center -mb-4">
          <div className="pointer-events-none absolute -inset-y-8 -left-0.5 border-l border-dashed border-[rgb(var(--foreground-muted)/0.3)] [mask-image:linear-gradient(to_bottom,transparent,white_1rem,white_calc(100%_-_1rem),transparent)]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute -inset-y-8 -right-0.5 border-r border-dashed border-[rgb(var(--foreground-muted)/0.3)] [mask-image:linear-gradient(to_bottom,transparent,white_1rem,white_calc(100%_-_1rem),transparent)]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute -inset-x-8 -top-0.5 border-t border-dashed border-[rgb(var(--foreground-muted)/0.3)] [mask-image:linear-gradient(to_right,transparent,white_1rem,white_calc(100%_-_1rem),transparent)]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute -inset-x-8 -bottom-0.5 border-b border-dashed border-[rgb(var(--foreground-muted)/0.3)] [mask-image:linear-gradient(to_right,transparent,white_1rem,white_calc(100%_-_1rem),transparent)]" aria-hidden="true"></div>
          <div className="relative w-18 h-18 overflow-clip">
            <Image
              src="/puffer.jpg"
              alt="Preston Bourne"
              fill
              priority
              className="object-cover hover:scale-125 saturate-0 hover:saturate-100 transition-all"
            />
          </div>
        </div>
        <Heading level={1}>preston bourne</Heading>
        <Paragraph className={"my-2"}>
          ~ currently: product engineering at{" "}
          <PersonLink name="hedra" url="https://www.hedra.com" />
          <br /> ~ previously:{" "}
          <PersonLink name="ibm" url="https://www.ibm.com" />,{" "}
          <PersonLink name="hashicorp" url="https://www.hashicorp.com" />,{" "}
          <PersonLink name="cornell" url="https://www.cornell.edu" />,{" "}
          <PersonLink name="parsons" url="https://www.newschool.edu/parsons/bfa-design-technology/" />
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
        <DynamicGrid posts={sortedPosts} />
      </main>
    </>
  );
}
