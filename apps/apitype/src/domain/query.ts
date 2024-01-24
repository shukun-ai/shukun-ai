import { z } from 'zod';

export type Query = z.infer<typeof querySchema>;

export type QueryInput = Query['inputs'][number];

export type QueryStep = Query['steps'][number];

export type QueryGeneratedQuery = NonNullable<
  Query['steps'][number]['generatedQuery']
>;

export const querySchema = z.object({
  inputs: z.array(
    z.object({
      name: z.string(),
      label: z.string(),
      description: z.string().optional(),
      inputType: z.enum(['text', 'integer', 'float', 'boolean', 'select']),
    })
  ),
  steps: z.array(
    z.object({
      schemaId: z.string().optional(),
      promptTask: z.string(),
      generatedQuery: z
        .object({
          dbType: z.enum(['postgres']),
          schemaDdl: z.string(),
          querySql: z.string(),
          resultDdl: z.string(),
          lastGeneratedAt: z.string().datetime({ precision: 3 }),
        })
        .optional(),
    })
  ),
});
