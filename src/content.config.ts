import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/index.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    hero: z.preprocess(
      (value) => (value === '' || value == null ? undefined : value),
      image().optional(),
    ),
    heroAlt: z.string().default(''),
    heroPosition: z.enum(['right', 'below']).default('right'),
    published: z.coerce.date(),
    updated: z.preprocess(
      (value) => (value === '' || value == null ? undefined : value),
      z.coerce.date().optional(),
    ),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
