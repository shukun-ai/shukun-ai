import {
  pgTable,
  timestamp,
  text,
  uniqueIndex,
  jsonb,
  uuid,
} from 'drizzle-orm/pg-core';

export const schemas = pgTable(
  'schemas',
  {
    schemaId: uuid('schemaId').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    tables: jsonb('tables').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).notNull(),
    connection: jsonb('connection').notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex('schemas_name_key').on(table.name),
    };
  }
);

export const queries = pgTable(
  'queries',
  {
    queryId: uuid('queryId').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    createdAt: timestamp('createdAt', {
      precision: 3,
      mode: 'string',
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).notNull(),
    metadata: jsonb('metadata').notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex('queries_name_key').on(table.name),
    };
  }
);
