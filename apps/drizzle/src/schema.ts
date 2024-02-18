import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
  jsonb,
} from 'drizzle-orm/pg-core';

export const prismaMigrations = pgTable('_prisma_migrations', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  checksum: varchar('checksum', { length: 64 }).notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
  migrationName: varchar('migration_name', { length: 255 }).notNull(),
  logs: text('logs'),
  rolledBackAt: timestamp('rolled_back_at', {
    withTimezone: true,
    mode: 'string',
  }),
  startedAt: timestamp('started_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer('applied_steps_count').default(0).notNull(),
});

export const schemas = pgTable(
  'schemas',
  {
    schemaId: text('schemaId').primaryKey().notNull(),
    name: text('name').notNull(),
    tables: jsonb('tables').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
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
    queryId: text('queryId').primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
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

export const users = pgTable(
  'users',
  {
    userId: text('userId').primaryKey().notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      usernameKey: uniqueIndex('users_username_key').on(table.username),
    };
  }
);

export const threads = pgTable('threads', {
  threadId: text('threadId').primaryKey().notNull(),
  title: text('title').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.userId, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  templateId: text('templateId')
    .notNull()
    .references(() => templates.templateId, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
});

export const templates = pgTable(
  'templates',
  {
    templateId: text('templateId').primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).notNull(),
    steps: jsonb('steps').notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex('templates_name_key').on(table.name),
    };
  }
);

export const messages = pgTable('messages', {
  messageId: text('messageId').primaryKey().notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  metadata: jsonb('metadata').notNull(),
  threadId: text('threadId')
    .notNull()
    .references(() => threads.threadId, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
});
