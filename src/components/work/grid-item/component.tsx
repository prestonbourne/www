import type { WorkExternal, WorkWithRoute } from "@/lib/work/types";
import { cx } from "class-variance-authority";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { ServerImage } from "@/components/image/server-image";

type WorkGridItemProps = {
  work: WorkWithRoute | WorkExternal;
};

export const WorkRouteGridItem: React.FC<WorkGridItemProps> = ({ work }) => {
  const containerClass = cx(
    "cursor-pointer block shadow-sheen overflow-hidden",
    "relative rounded-sm overflow-hidden max-h-96",
    "group/card"
  );

  const isWorkRoute = (
    work: WorkWithRoute | WorkExternal
  ): work is WorkWithRoute => {
    return work.type === "work_route";
  };

  const link = isWorkRoute(work) ? `/work/${work.slug}` : work.url;
  const linkTarget = isWorkRoute(work) ? undefined : "_blank";

  const iconClass = cx(
    `text-xs flex items-center gap-1 text-slate-300 bg-gray-950/90 px-1 py-1 rounded-full shadow-dense`,
    "border border-slate-300",
    "opacity-0 -translate-y-3 transition-all",
    "group-hover/card:opacity-100 group-hover/card:translate-y-0",
  );

  return (
    <NextLink className={containerClass} href={link} target={linkTarget}>
      <div className="relative w-full h-fit rounded-sm overflow-hidden">
        <ServerImage
          src={work.metadata.imageURL!}
          alt={`${work.metadata.title} cover`}
          className={cx(
            "w-full h-auto transition-all contrast-[.9]",
            "group-hover/card:contrast-100 group-hover/card:scale-105"
          )}
          sizes="(max-width: 1200px) 60vw, 30vw, (max-width: 768px) 100vw"
        />
      </div>
    <div>

    </div>
      <div className={cx(iconClass, "absolute top-2 right-2")}>
        <ArrowTopRightIcon />
      </div>
    </NextLink>
  );
};
