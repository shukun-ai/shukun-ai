import { Injectable, OnModuleInit } from '@nestjs/common';
import { db, pool } from './db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { resolve } from 'node:path';

@Injectable()
export class DrizzleClientService implements OnModuleInit {
  public db!: typeof db;

  async onModuleInit() {
    await pool.connect();
    this.db = db;
    await migrate(db, {
      migrationsFolder: resolve(
        process.cwd(),
        './apps/core/drizzle-client/src/migration'
      ),
    });
  }
}
