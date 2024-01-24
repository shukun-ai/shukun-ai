import { SchemaDefinition } from '@ailake/apitype';

export type CreateRequest = {
  taskPrompt: string;
  schema: SchemaDefinition;
};

export type CreateResponse = {
  prompt: string;
  schemaDdl: string;
};
