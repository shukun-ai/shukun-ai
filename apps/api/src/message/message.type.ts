import { ThreadMessageMetadata } from '@ailake/apitype';

export type RetrieveRequest = {
  messageId: string;
};

export type RetrieveResponse = {
  messageId: string;
  role: 'system' | 'user' | 'assistant';
  createdAt: string;
  updatedAt: string;
  metadata: ThreadMessageMetadata;
  threadId: string;
};

export type ListRequest = {
  //
};

export type ListResponse = {
  messageId: string;
  role: 'system' | 'user' | 'assistant';
  createdAt: string;
  updatedAt: string;
  metadata: ThreadMessageMetadata;
  threadId: string;
}[];

export type CreateRequest = {
  role: 'system' | 'user' | 'assistant';
  metadata: ThreadMessageMetadata;
  threadId: string;
};

export type CreateResponse = {
  messageId: string;
};

export type UpdateRequest = {
  messageId: string;
  metadata?: ThreadMessageMetadata;
};

export type UpdateResponse = {
  messageId: string;
};
