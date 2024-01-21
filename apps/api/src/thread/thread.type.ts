export type RetrieveRequest = {
  threadId: string;
};

export type RetrieveResponse = {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  templateId: string;
};

export type ListRequest = {
  //
};

export type ListResponse = {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}[];

export type CreateRequest = {
  title: string;
  userId: string;
  templateId: string;
};

export type CreateResponse = {
  threadId: string;
};

export type UpdateRequest = {
  threadId: string;
  title?: string;
};

export type UpdateResponse = {
  threadId: string;
};
