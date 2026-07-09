import type { SketchMetaData } from "./types";

type MetadataModule = {
  default: SketchMetaData;
};

export const sketchIDs = ["first-water", "mesh-gradient-1", "conways-web-gpu"];

export const getSketchesLite = async () => {
  return await Promise.all(
    sketchIDs.map(async (id) => {
      const metadata = await import(`../../sketches/${id}/metadata.ts`).then(
        (mod: MetadataModule) => mod.default
      );

      /* this is in accordance with next.js static file serving,
      https://nextjs.org/docs/app/building-your-application/optimizing/static-assets
      */
      const imageUrl = metadata.imageUrl || `/sketches/${id}/cover.png`;

      return { id, type: "sketch" as const, ...metadata, imageUrl };
    })
  );
};
