import { z } from 'zod';

export type PgColumnsSchema = z.infer<typeof pgColumnsSchema>;

export const pgColumnsSchema = z.object({
  rows: z.array(
    z.object({
      table_name: z.string(),
      column_name: z.string(),
      data_type: z.string(),
      character_maximum_length: z.number().int().nullable(),
      numeric_precision: z.number().int().nullable(),
      numeric_scale: z.number().int().nullable(),
      constraint_name: z.string().nullable(),
      foreign_table_name: z.string().nullable(),
      foreign_column_name: z.string().nullable(),
      column_comment: z.string().nullable(),
    })
  ),
});
