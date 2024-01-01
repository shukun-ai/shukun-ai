import { DataResult } from '@ailake/apitype';
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

  async run(sql: string): Promise<DataResult['data']> {
    const client = await this.getPool().connect();
    const result = await client.query(sql);
    client.release();

    const data: DataResult['data'] = {
      type: 'Collection',
      command: result.command,
      fields: result.fields,
      rows: result.rows,
    };

    return data;
  }

  private getPool() {
    if (this.pool) {
      return this.pool;
    }
    throw new Error('the pool is not created');
  }
}
