import { defineCollection } from 'astro:content';
import { z } from "astro/zod";
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.yaml',
    base: "./src/content/posts" 
  }), 
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    imgs: z.array(z.string()),
    audioSrc: z.string().nullable().optional(),
  }),
});

export const collections = {
  'posts': postsCollection,
};


