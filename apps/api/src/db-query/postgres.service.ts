import { Result, TableDefinition } from '@ailake/apitype';
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Pool, Client } from 'pg';
import { environment } from '../environment';
import { PgResultSchema, pgResultSchema } from './postgres.type';
import { listColumnsSql } from './postgres.columns.sql';
import { pgColumnsSchema } from './postgres.columns.type';
import { pgColumnsConvertor } from './postgres.columns.convertor';

@Injectable()
export class PostgresService implements OnModuleInit, OnApplicationShutdown {
  pool?: Pool;

  constructor() {}

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

  async run(sql: string): Promise<Result> {
    const client = await this.getPool().connect();

    try {
      const result = await client.query(sql);

      const parsedResult = pgResultSchema.parse(result);

      const data: Result = {
        fields: parseFields(parsedResult),
        rows: parsedResult.rows,
      };

      return data;
    } catch (error) {
      console.error(error);

      return {
        fields: [],
        rows: [],
      };
    } finally {
      client.release();
    }
  }

  async runQuery(sql: string, dbUrl: string): Promise<Result> {
    const client = new Client(dbUrl);
    await client.connect();

    try {
      const result = await client.query(sql);
      const parsedResult = pgResultSchema.parse(result);
      const data: Result = {
        fields: parseFields(parsedResult),
        rows: parsedResult.rows,
      };

      return data;
    } finally {
      await client.end();
    }
  }

  async generateSchema(dbUrl: string): Promise<TableDefinition[]> {
    const result = pgColumnsSchema.parse(await this.listColumns(dbUrl));
    const tables = pgColumnsConvertor(result);
    return tables;
  }

  private async listColumns(dbUrl: string) {
    const client = new Client(dbUrl);
    await client.connect();

    try {
      const response = await client.query(listColumnsSql());

      return response;
    } finally {
      await client.end();
    }
  }

  private getPool() {
    if (this.pool) {
      return this.pool;
    }
    throw new Error('the pool is not created');
  }
}

const parseFields = (result: PgResultSchema): Result['fields'] => {
  return result.fields.map((field) => {
    return {
      type: getFieldType(field.dataTypeID, result._types),
      name: field.name,
    };
  });
};

const getFieldType = (
  dataTypeID: number,
  types: PgResultSchema['_types']
): Result['fields'][number]['type'] => {
  const columnType = Object.entries(types._types.builtins).find(
    ([, value]) => value === dataTypeID
  );

  if (!columnType) {
    return 'text';
  }

  const [columnTypeName] = columnType;

  switch (columnTypeName) {
    case 'CHAR':
    case 'TEXT':
    case 'VARCHAR':
    case 'UUID':
      return 'text';
    case 'INT8':
    case 'INT2':
    case 'INT4':
      return 'int';
    case 'FLOAT4':
    case 'FLOAT8':
    case 'NUMERIC':
      return 'float';
    case 'BOOL':
      return 'bool';
    case 'DATE':
      return 'date';
    case 'TIME':
      return 'time';
    case 'TIMESTAMP':
    case 'TIMESTAMPTZ':
      return 'dateTime';
    case 'MONEY':
      return 'money';
    case 'BYTEA':
      return 'byte';
    case 'JSON':
    case 'XML':
      return 'code';
    case 'POLYGON':
      return 'polygon';
    case 'INTERVAL':
      return 'interval';
    default:
      return 'text';
  }
};
