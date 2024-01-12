import { DataResult } from '@ailake/apitype';
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Pool } from 'pg';
import { environment } from '../environment';
import { z } from 'zod';

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

  async run(sql: string): Promise<DataResult['data']> {
    const client = await this.getPool().connect();

    try {
      const result = await client.query(sql);

      const parsedResult = pgResultSchema.parse(result);

      const data: DataResult['data'] = {
        type: 'Collection',
        command: parsedResult.command,
        fields: parseFields(parsedResult),
        rows: parsedResult.rows,
      };

      return data;
    } catch (error) {
      console.error(error);

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

type PgResultSchema = z.infer<typeof pgResultSchema>;

const pgResultSchema = z.object({
  command: z.enum(['SELECT']),
  rowCount: z.number().int(),
  oid: z.unknown(),
  rows: z.array(z.record(z.string(), z.unknown())),
  fields: z.array(
    z.object({
      name: z.string(),
      tableID: z.number().int(),
      columnID: z.number().int(),
      dataTypeID: z.number().int(),
      dataTypeSize: z.number().int(),
      dataTypeModifier: z.number().int(),
      format: z.string(),
    })
  ),
  _parsers: z.array(z.unknown()),
  _types: z.object({
    _types: z.object({
      arrayParser: z.object({}),
      builtins: z.record(z.string(), z.number().int()),
    }),
    text: z.object({}),
    binary: z.object({}),
  }),
  RowCtor: z.unknown(),
  rowAsArray: z.boolean(), // only be false
  _prebuiltEmptyResultObject: z.record(z.string(), z.unknown()),
});

const parseFields = (result: PgResultSchema): DataResult['data']['fields'] => {
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
): DataResult['data']['fields'][number]['type'] => {
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
    default:
      return 'text';
  }
};
