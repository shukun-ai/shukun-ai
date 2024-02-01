import { SchemaConnection, SchemaTable } from '../domain/schema';

export type SchemaRetrieveInput = {
  schemaId: string;
};

export type SchemaRetrieveOutput = {
  schemaId: string;
  name: string;
  connection: SchemaConnection;
  tables: SchemaTable[];
  createdAt: string;
  updatedAt: string;
};

export type SchemaListInput = {
  //
};

export type SchemaListOutput = {
  schemaId: string;
  name: string;
  connection: SchemaConnection;
  createdAt: string;
  updatedAt: string;
}[];

export type SchemaCreateInput = {
  name: string;
  connection: SchemaConnection;
};

export type SchemaCreateOutput = {
  schemaId: string;
};

export type SchemaUpdateInput = {
  schemaId: string;
  connection?: SchemaConnection;
  tables?: SchemaTable[];
};

export type SchemaUpdateOutput = {
  schemaId: string;
};

export type SchemaRemoveInput = {
  schemaId: string;
};

export type SchemaRemoveOutput = {
  schemaId: string;
};

export type SchemaSyncInput = {
  schemaId: string;
};

export type SchemaSyncOutput = {
  schemaId: string;
};
