"use client";
/*
  next/dynamic with `ssr: false` is only allowed in client modules as of
  Next 15, so this file must stay out of any server component's import graph.
  Server code that only needs metadata should use ./getSketchesLite instead.
*/
import type { Sketch, SketchMetaData } from "./types";
import { SketchLoading } from "@/components/sketches/loading";
import dynamic from "next/dynamic";
import { sketchIDs } from "./getSketchesLite";

type MetadataModule = {
  default: SketchMetaData;
};

let _sketches: Sketch[] = [];
export const getSketches = async (): Promise<Sketch[]> => {
  if (_sketches.length) return _sketches;

  const sketches = await Promise.all(
    sketchIDs.map(async (id) => {
      const metadata = await import(`../../sketches/${id}/metadata.ts`).then(
        (mod: MetadataModule) => mod.default
      );

      const Component = dynamic(
        () => import(`../../sketches/${id}/sketch.tsx`),
        { ssr: false, loading: SketchLoading }
      );

      /* this is in accordance with next.js static file serving,
      https://nextjs.org/docs/app/building-your-application/optimizing/static-assets
      */
      const imageUrl = metadata.imageUrl || `/sketches/${id}/cover.png`;

      return { id, type: "sketch" as const, ...metadata, Component, imageUrl };
    })
  );
  _sketches = sketches;
  return sketches;
};
