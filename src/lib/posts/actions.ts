import { getBrowserClient } from "@/lib/supabase/browser-client";

export const registerView = async (slug: string): Promise<void> => {
  const { data, error } = await getBrowserClient().rpc("increment_post_views_by_slug", {
        post_slug: slug,
      }
    );
  
    if (error) {
    console.error(error);
  }
};