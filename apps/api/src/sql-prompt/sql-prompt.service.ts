import { Injectable } from '@nestjs/common';
import { CreateRequest, CreateResponse } from './sql-prompt.type';
import { getPromptTemplate } from './sql-prompt.template';
import { buildSchema } from './schema-to-prompt';

@Injectable()
export class SqlPromptService {
  constructor() {}

  async create(props: CreateRequest): Promise<CreateResponse> {
    const schemaDdl = buildSchema(props.schema);
    const prompt = getPromptTemplate(props.taskPrompt, schemaDdl);

    return {
      prompt,
      schemaDdl,
    };
  }
}
