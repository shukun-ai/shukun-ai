import type { Config } from 'drizzle-kit';
import { resolve } from 'node:path';

export default {
  driver: 'pg',
  out: './apps/core/drizzle-client/src/migration',
  schema: [resolve(__dirname, './src/schema.ts')],
  verbose: true,
  strict: true,
} satisfies Config;
