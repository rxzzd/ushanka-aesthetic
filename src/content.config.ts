import { defineCollection } from 'astro:content';
import { z } from "astro/zod";
import { glob } from 'astro/loaders'; // Импортируем glob loader

const postsCollection = defineCollection({
  // Вместо type: 'content' теперь используется loader
  loader: glob({ 
    pattern: '**/[^_]*.{md,mdx}', // ищет все .md и .mdx файлы
    base: "./src/content/posts"  // указывает, где именно лежат файлы постов
  }), 
  schema: z.object({
    title: z.string(),
    date: z.date(),
    time: z.iso.time(),
    img1: z.string(),
    img2: z.string(),
    audioSrc: z.string(),
  }),
});

export const collections = {
  'posts': postsCollection,
};


