import { TemplateStep } from '@ailake/apitype';

export type RetrieveRequest = {
  templateId: string;
};

export type RetrieveResponse = {
  templateId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  steps: TemplateStep[];
};

export type ListRequest = {
  //
};

export type ListResponse = {
  templateId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}[];

export type CreateRequest = {
  name: string;
  steps: TemplateStep[];
};

export type CreateResponse = {
  templateId: string;
};

export type UpdateRequest = {
  templateId: string;
  name?: string;
  steps?: TemplateStep[];
};

export type UpdateResponse = {
  templateId: string;
};
