import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()),
  seriesId: z.string().optional().nullable(),
  newSeries: z
    .object({
      title: z.string().optional(),
      thumbnail: z.string().optional(),
    })
    .optional()
    .nullable(),
});

export type BlogProps = z.infer<typeof blogSchema>;
