export type TemplateRetrieveInput = {
  templateId: string;
};

export type TemplateRetrieveOutput = {
  templateId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  steps: TemplateStep[];
};

export type TemplateListInput = {
  //
};

export type TemplateListOutput = {
  templateId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}[];

export type TemplateCreateInput = {
  name: string;
  steps: TemplateStep[];
};

export type TemplateCreateOutput = {
  templateId: string;
};

export type TemplateUpdateInput = {
  templateId: string;
  name?: string;
  steps?: TemplateStep[];
};

export type TemplateUpdateOutput = {
  templateId: string;
};

export type TemplateRemoveInput = {
  templateId: string;
};

export type TemplateRemoveOutput = {
  templateId: string;
};

export type TemplateStep = {
  stepId: string;
  name: string;
  metadata: TemplateStepMetadataText | TemplateStepMetadataDbQuery;
};

export type TemplateStepMetadataText = {
  type: 'text';
  tip: string;
  maxLength: number;
  optional: boolean;
};

export type TemplateStepMetadataDbQuery = {
  type: 'dbQuery';
  promptTask: string;
  sql: string;
  tables: {
    schemaName: string;
    tableName: string;
  }[];
};
