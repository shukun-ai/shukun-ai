import { z } from 'zod';

export type PgResultSchema = z.infer<typeof pgResultSchema>;

export const pgResultSchema = z.object({
  command: z.enum(['SELECT']),
  rowCount: z.number().int(),
  oid: z.unknown(),
  rows: z.array(z.record(z.string(), z.unknown())),
  fields: z.array(
    z.object({
      name: z.string(),
      tableID: z.number().int(),
      columnID: z.number().int(),
      dataTypeID: z.number().int(),
      dataTypeSize: z.number().int(),
      dataTypeModifier: z.number().int(),
      format: z.string(),
    })
  ),
  _parsers: z.array(z.unknown()),
  _types: z.object({
    _types: z.object({
      arrayParser: z.object({}),
      builtins: z.record(z.string(), z.number().int()),
    }),
    text: z.object({}),
    binary: z.object({}),
  }),
  RowCtor: z.unknown(),
  rowAsArray: z.boolean(), // only be false
  _prebuiltEmptyResultObject: z.record(z.string(), z.unknown()),
});
