import { z } from 'zod';

export type Query = z.infer<typeof querySchema>;

export type QueryInput = Query['inputs'][number];

export type QueryStep = Query['steps'][number];

export type QueryGeneratedQuery = NonNullable<
  Query['steps'][number]['generatedQuery']
>;

export type QueryQueriedFields = NonNullable<
  Query['steps'][number]['queriedFields']
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
          tableName: z.string(),
          dbType: z.enum(['postgres']),
          schemaDdl: z.string(),
          querySql: z.string(),
          lastGeneratedAt: z.string().datetime({ precision: 3 }),
        })
        .optional(),
      queriedFields: z
        .object({
          fields: z.array(
            z.object({
              type: z.enum([
                'text',
                'int',
                'float',
                'bool',
                'date',
                'time',
                'dateTime',
                'money',
                'byte',
                'code',
                'polygon',
                'interval',
              ]),
              name: z.string(),
            })
          ),
          lastGeneratedAt: z.string().datetime({ precision: 3 }),
        })
        .optional(),
    })
  ),
});
