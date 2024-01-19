export type SqlParameter = {
  name: string;
  label: string;
  type: 'text' | 'singleSelect';
  options?: string[];
  maxLength: number;
  optional: boolean;
};

export type RetrieveRequest = {
  templateId: string;
};

export type RetrieveResponse = {
  templateId: string;
  name: string;
  taskTemplate: string;
  sqlTemplate: string;
  sqlParameters: SqlParameter[];
  schemaId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListRequest = {
  //
};

export type ListResponse = {
  templateId: string;
  name: string;
}[];

export type CreateRequest = {
  name: string;
  taskTemplate: string;
  sqlTemplate: string;
  sqlParameters: SqlParameter[];
  schemaId: string;
};

export type CreateResponse = {
  templateId: string;
};

export type UpdateRequest = {
  templateId: string;
  name: string;
  taskTemplate: string;
  sqlTemplate: string;
  sqlParameters: SqlParameter[];
  schemaId: string;
};

export type UpdateResponse = {
  templateId: string;
};
