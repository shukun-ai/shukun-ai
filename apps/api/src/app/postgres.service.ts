import { DataResult } from '@ailake/apitype';
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Pool } from 'pg';
import { environment } from '../environment';

@Injectable()
export class PostgresService implements OnModuleInit, OnApplicationShutdown {
  pool?: Pool;

  constructor() { }

  onModuleInit() {
    this.pool = new Pool({
      user: environment.PG_USER,
      host: environment.PG_HOST,
      database: environment.PG_DATABASE,
      password: environment.PG_PASSWORD,
      port: environment.PG_PORT,
      max: environment.PG_MAX,
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

    try {
      const result = await client.query(sql);
      const data: DataResult['data'] = {
        type: 'Collection',
        command: result.command,
        fields: result.fields,
        rows: result.rows,
      };

      return data;
    } catch {
      return {
        type: 'Collection',
        command: 'SELECT',
        fields: [],
        rows: [],
      };
    } finally {
      client.release();
    }
  }

  private getPool() {
    if (this.pool) {
      return this.pool;
    }
    throw new Error('the pool is not created');
  }
}
