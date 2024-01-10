import {
  SchemaDomain,
  SchemaDomainTable,
  UniqueTableName,
} from '../domain/schema';

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

export type CreateSchemaResponse = {
  id: string;
};

export type ModifySchemaDto = {
  id: string;
  name?: string;
  type?: string;
  url?: string;
  secretKey?: string;
};

export type ModifySchemaResponse = null;

export type RemoveSchemaDto = {
  id: string;
};

export type RemoveSchemaResponse = null;

export type FindSchemaDto = {
  filter?: {
    name?: string;
  };
};

export type FindSchemaResponse = SchemaDomain[];

export type PushTablesDto = {
  schemaId: string;
  tables: Record<UniqueTableName, SchemaDomainTable>;
};

export type PushTablesResponse = null;
