import { SchemaDefinition } from './schema';
import { buildSchema } from './schema-to-prompt';

export const getPrompt = (question: string, schema: SchemaDefinition) =>
  [
    '### Instructions',
    '- if the question cannot be answered given the database schema, return "I do not know"',
    '### Task',
    'Generate a SQL query to answer the following question:',
    '`' + question + '`',
    '### Database Schema',
    'The query will run on a database with the following schema:',
    '```',
    buildSchema(schema),
    '```',
    '### Answer',
    'Here is the SQL query that answers the question:',
    '`' + question + '`',
    '```sql',
  ].join('\n');
