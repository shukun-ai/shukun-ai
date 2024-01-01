import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PostgresService implements OnModuleInit, OnApplicationShutdown {
  pool?: Pool;

  constructor() {}

  onModuleInit() {
    this.pool = new Pool({
      user: 'chase_wu',
      host: 'localhost',
      database: 'bi_demo',
      password: undefined,
      port: 5432,
      max: 3,
    });
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async onApplicationShutdown() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  async run(sql: string): Promise<unknown> {
    const client = await this.getPool().connect();
    const result = await client.query(sql);
    client.release();
    return result;
  }

  private getPool() {
    if (this.pool) {
      return this.pool;
    }
    throw new Error('the pool is not created');
  }
}
