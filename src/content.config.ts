import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { parseFile } from "music-metadata";
import { existsSync } from "node:fs";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const postsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "./src/content/posts",
  }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      imgs: z.array(z.string()),
      audioSrc: z.string(),
    })
    .transform(async (data) => {
      let extractedArtist;
      let extractedTitle;
      let extractedCover: string | null = null;
      const filepath = "./public" + data.audioSrc;

      let fileExists = existsSync(filepath);
      let retries = 0;

      while (!fileExists && retries < 10) {
        await delay(500);
        fileExists = existsSync(filepath);
        retries++;
      }

      try {
        const metadata = await parseFile(filepath);

        extractedArtist = metadata.common.artist;
        extractedTitle = metadata.common.title;
        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const songCover = metadata.common.picture[0];
          const baseString64URL = Buffer.from(songCover.data).toString(
            "base64",
          );
          extractedCover = `data:${songCover.format};base64,${baseString64URL}`;
        }
      } catch (e) {
        console.error(e);
      }
      return {
        ...data,
        metadata: {
          artist: extractedArtist,
          title: extractedTitle,
          cover: extractedCover,
        },
      };
    }),
});

export const collections = {
  posts: postsCollection,
};
