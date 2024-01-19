export const apiPath = {
  templates: {
    retrieve: 'templates/retrieve',
    list: 'templates/list',
    create: 'templates/create',
    update: 'templates/update',
  },
};

export type TemplateSqlParameter = {
  name: string;
  label: string;
  type: 'text' | 'singleSelect';
  options?: string[];
  maxLength: number;
  optional: boolean;
};

export type TemplateRetrieveInput = {
  templateId: string;
};

export type TemplateRetrieveOutput = {
  templateId: string;
  name: string;
  taskTemplate: string;
  sqlTemplate: string;
  sqlParameters: TemplateSqlParameter[];
  schemaId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TemplateListInput = {
  //
};

export type TemplateListOutput = {
  templateId: string;
  name: string;
}[];

export type TemplateCreateInput = {
  name: string;
  taskTemplate: string;
  sqlTemplate: string;
  sqlParameters: TemplateSqlParameter[];
  schemaId: string;
};

export type TemplateCreateOutput = {
  templateId: string;
};

export type TemplateUpdateInput = {
  templateId: string;
  name: string;
  taskTemplate: string;
  sqlTemplate: string;
  sqlParameters: TemplateSqlParameter[];
  schemaId: string;
};

export type TemplateUpdateOutput = {
  templateId: string;
};
