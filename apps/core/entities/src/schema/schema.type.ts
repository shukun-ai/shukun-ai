import { SchemaConnection, SchemaTable } from '@shukun-ai/apitype';

export type RetrieveRequest = {
  schemaId: string;
};

export type RetrieveResponse = {
  schemaId: string;
  name: string;
  connection: SchemaConnection;
  tables: SchemaTable[];
  createdAt: string;
  updatedAt: string;
};

export type ListRequest = {
  //
};

export type ListResponse = {
  schemaId: string;
  name: string;
  connection: SchemaConnection;
  createdAt: string;
  updatedAt: string;
}[];

export type CreateRequest = {
  name: string;
  connection: SchemaConnection;
  tables: SchemaTable[];
};

export type CreateResponse = {
  schemaId: string;
};

export type UpdateRequest = {
  schemaId: string;
  name?: string;
  connection?: SchemaConnection;
  tables?: SchemaTable[];
};

export type UpdateResponse = {
  schemaId: string;
};

export type RemoveRequest = {
  schemaId: string;
};

export type RemoveResponse = {
  schemaId: string;
};
