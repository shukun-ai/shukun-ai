import { z } from 'zod';

export type Result = z.infer<typeof resultSchema>;

export type QueryField = Result['fields'][number];

export type QueryFieldType = Result['fields'][number]['type'];

export type QueryRow = Result['rows'][number];

export const resultSchema = z.object({
  fields: z.array(
    z.object({
      name: z.string(),
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
    })
  ),
  rows: z.array(z.record(z.string(), z.unknown())),
});
