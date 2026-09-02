import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro:content';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    // `reviewed` marks whether a page has been through the content pass of
    // pim-docs/plans/user-documentation/content-execution.md. Pages carried over
    // from the 2021 site are `false` and render a "may be out of date" notice via
    // the PageTitle override; the flag is also the burndown for that plan
    // (`grep -rc "reviewed: false" src/content`).
    //
    // Starlight REJECTS unknown frontmatter keys, so this extend() is what makes
    // `reviewed:` legal at all — remove it and every page carrying the flag fails
    // the build.
    schema: docsSchema({
      extend: z.object({
        reviewed: z.boolean().default(true),
      }),
    }),
  }),
};
