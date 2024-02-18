import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { environment } from '@shukun-ai/environment';
import { schemas, queries } from './schema';

export const pool = new Pool({
  connectionString: environment.APP_DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    schemas,
    queries,
  },
});
