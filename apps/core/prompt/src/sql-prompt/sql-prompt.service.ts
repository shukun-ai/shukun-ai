import { Injectable } from '@nestjs/common';
import { getPromptTemplate } from './sql-prompt.template';
import { buildSchema } from './schema-to-prompt';
import { Schema } from '@shukun-ai/apitype';

@Injectable()
export class SqlPromptService {
  constructor() {}

  getDQL(
    taskPrompt: string,
    schema: Schema,
    lastResultDDL: string
  ): {
    prompt: string;
    schemaDdl: string;
  } {
    const schemaDdl = buildSchema(schema);
    const schemaPrompt = lastResultDDL
      ? lastResultDDL + '\n' + schemaDdl
      : schemaDdl;
    const prompt = getPromptTemplate(taskPrompt, schemaPrompt);

    return {
      prompt,
      schemaDdl: schemaPrompt,
    };
  }

  getDDL(
    sql: string,
    schema: string
  ): {
    prompt: string;
  } {
    const prompt = [
      '#Instruction',
      'Do not use table and column names that have appeared in the Schema.',
      '# Task',
      'Generate a CREATE TABLE statement based on the SQL Query, ensuring to create only one table. Avoid creating a second or third table. The field names of the new table must match the fields in the SQL Query:',
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
