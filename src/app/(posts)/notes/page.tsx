import { PostListPage } from "@/components/posts/post-list-page";
import { NextPageProps } from "@/lib/types";

const ROUTE = "notes";

export default async function Page(props: NextPageProps) {
  const params = await props.params;
  return <PostListPage params={params} postType={ROUTE} />;
}

