import type { Config } from 'drizzle-kit';
import { resolve } from 'node:path';
const connectionString = '';

export default {
  driver: 'pg',
  out: './apps/core/drizzle-client/src/migration',
  schema: [resolve(__dirname, './apps/core/drizzle-client/src/schema.ts')],
  dbCredentials: { connectionString },
  verbose: true,
  strict: true,
} satisfies Config;
