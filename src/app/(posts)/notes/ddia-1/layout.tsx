import { PostLayout } from "@/components/posts/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PostLayout slug="ddia-1">{children}</PostLayout>;
}
