import { defineCollection } from 'astro:content';
import { z } from "astro/zod";
import { glob } from 'astro/loaders'; // Импортируем glob loader

const postsCollection = defineCollection({
  // Вместо type: 'content' теперь используется loader
  loader: glob({ 
    pattern: '**/*.yaml', // Ищем файлы .yaml, созданные Keystatic
    base: "./src/content/posts" 
  }), 
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    img1: z.string().nullable().optional(),
    img2: z.string().nullable().optional(),
    audioSrc: z.string().nullable().optional(),
  }),
});

export const collections = {
  'posts': postsCollection,
};


