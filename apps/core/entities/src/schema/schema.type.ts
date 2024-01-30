import { TableDefinition } from '@shukun-ai/apitype';

export type RetrieveRequest = {
  schemaId: string;
};

export type RetrieveResponse = {
  schemaId: string;
  name: string;
  tables: TableDefinition[];
  dbType: string;
  dbUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type ListRequest = {
  //
};

export type ListResponse = {
  schemaId: string;
  name: string;
  dbType: string;
  createdAt: string;
  updatedAt: string;
}[];

export type CreateRequest = {
  name: string;
  tables: TableDefinition[];
  dbType: string;
  dbUrl: string;
};

export type CreateResponse = {
  schemaId: string;
};

export type UpdateRequest = {
  schemaId: string;
  name?: string;
  tables?: TableDefinition[];
  dbType?: string;
  dbUrl?: string;
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
