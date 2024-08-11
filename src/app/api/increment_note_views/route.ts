import { supabase } from "@/lib/supabase/server-client";
import { makeAPIResponse } from "../utils";

export async function POST(request: Request) {

  const { note_slug } = await request.json();
  console.log("note_slug", note_slug);

  if (!note_slug) {
    const res = makeAPIResponse("ERROR", 400, "param note_slug is required");
    return res;
  }

  const { error } = await supabase.rpc("increment_note_views", {
    note_slug,
  });

  if (error) {
    const res = makeAPIResponse(
      "ERROR",
      500,
      `${error.message} ${error.details} ${error.hint}`
    );
    return res;
  }

  return makeAPIResponse("SUCCESS", 200);
}
