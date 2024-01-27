import { Query } from '@ailake/apitype';

export type RetrieveRequest = {
  queryId: string;
};

export type RetrieveResponse = {
  queryId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  metadata: Query;
};

export type ListRequest = {
  //
};

export type ListResponse = {
  queryId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}[];

export type CreateRequest = {
  name: string;
};

export type CreateResponse = {
  queryId: string;
};

export type UpdateRequest = {
  queryId: string;
  name?: string;
  metadata?: Query;
};

export type UpdateResponse = {
  queryId: string;
};

export type RemoveRequest = {
  queryId: string;
};

export type RemoveResponse = {
  queryId: string;
};
