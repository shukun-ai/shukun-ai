import { z } from 'zod';

export type Schema = z.infer<typeof schemaSchema>;

export type SchemaConnection = Schema['connection'];

export type SchemaTable = Schema['tables'][number];

export type SchemaColumn = Schema['tables'][number]['columns'][number];

export const schemaConnectionSchema = z.object({
  type: z.enum(['postgres']),
  database: z.string(),
  user: z.string(),
  password: z.string(),
  port: z.number().int(),
  host: z.string(),
  schema: z.string().optional(),
});

export const schemaTableSchema = z.object({
  tableName: z.string(),
  tableAlias: z.array(z.string()),
  columns: z.array(
    z.object({
      columnName: z.string(),
      columnAlias: z.array(z.string()),
      columnType: z.string(),
      characterLength: z.number().int().optional(),
      precision: z.number().int().optional(),
      scale: z.number().int().optional(),
      enums: z
        .array(
          z.object({
            key: z.string(),
            label: z.string(),
          })
        )
        .optional(),
      columnDefault: z.unknown().optional(),
      notNullable: z.boolean().optional(),
      isPrimary: z.boolean().optional(),
      isUnique: z.boolean().optional(),
      isIndexed: z.boolean().optional(),
      comment: z.string().optional(),
      reference: z
        .object({
          tableName: z.string(),
          columnName: z.string(),
          displayColumnName: z.string(),
        })
        .optional(),
    })
  ),
});

export const schemaSchema = z.object({
  name: z.string(), // unique
  connection: schemaConnectionSchema,
  tables: z.array(schemaTableSchema),
});
