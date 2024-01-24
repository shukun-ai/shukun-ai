import { Injectable } from '@nestjs/common';
import { getPromptTemplate } from './sql-prompt.template';
import { buildSchema } from './schema-to-prompt';
import { SchemaDefinition } from '@ailake/apitype';

@Injectable()
export class SqlPromptService {
  constructor() {}

  getDQL(
    taskPrompt: string,
    schema: SchemaDefinition
  ): {
    prompt: string;
    schemaDdl: string;
  } {
    const schemaDdl = buildSchema(schema);
    const prompt = getPromptTemplate(taskPrompt, schemaDdl);

    return {
      prompt,
      schemaDdl,
    };
  }

  getDDL(
    sql: string,
    schema: string
  ): {
    prompt: string;
  } {
    const prompt = [
      '# Task',
      'Generate a SQL Create table statement based on the following SQL Query:',
      '### SQL Query',
      '```',
      sql,
      '```',
      '### SQL Schema',
      schema,
      '# Answer',
      '```sql',
    ].join('\n');
    return { prompt };
  }
}
