import { SchemaDomainTable, UniqueTableName } from '../domain/schema';

export const schemaPath = {
  createSchema: '/create-schema',
  modifySchema: '/modify-schema',
  removeSchema: '/remove-schema',
  findSchema: '/find-schema',
  pushTables: '/push-tables',
};

export type CreateSchemaDto = {
  name: string; // unique
  type: string;
  url: string;
  secretKey: string;
};

export type CreateSchemaResponse = null;

export type ModifySchemaDto = {
  name: string;
  type?: string;
  url?: string;
  secretKey?: string;
};

export type ModifySchemaResponse = null;

export type RemoveSchemaDto = {
  name: string;
};

export type RemoveSchemaResponse = null;

export type FindSchemaDto = {
  name?: string;
};

export type FindSchemaResponse = {
  name: string; // unique
  type: string;
  url: string;
  secretKey: string;
}[];

export type PushTablesDto = {
  schemaName: string;
  tables: Record<UniqueTableName, SchemaDomainTable>;
};

export type PushTablesResponse = null;
