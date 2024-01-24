import { Query } from './domain/query';

export type QueryRetrieveInput = {
  queryId: string;
};

export type QueryRetrieveOutput = {
  queryId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  metadata: Query;
};

export type QueryListInput = {
  //
};

export type QueryListOutput = {
  queryId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}[];

export type QueryCreateInput = {
  name: string;
};

export type QueryCreateOutput = {
  queryId: string;
};

export type QueryUpdateInput = {
  queryId: string;
  name?: string;
  metadata?: Query;
};

export type QueryUpdateOutput = {
  queryId: string;
};

export type QueryRemoveInput = {
  queryId: string;
};

export type QueryRemoveOutput = {
  queryId: string;
};
