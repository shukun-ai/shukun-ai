export type RetrieveRequest = {
  threadId: string;
};

export type RetrieveResponse = {
  threadId: string;
  threadTitle: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ListRequest = {
  //
};

export type ListResponse = {
  threadId: string;
  threadTitle: string;
}[];

export type CreateRequest = {
  threadTitle: string;
  userId: string;
};

export type CreateResponse = {
  threadId: string;
};

export type UpdateRequest = {
  threadId: string;
  threadTitle?: string;
};

export type UpdateResponse = {
  threadId: string;
};
