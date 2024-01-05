import { SchemaDefinition } from './schema';
import { buildSchema } from './schema-to-prompt';

export const getPrompt = (
  question: string,
  schema: SchemaDefinition
) => `### Instructions:
Your task is convert a question into a SQL query, given a Postgres database schema.
Adhere to these rules:
- if the question cannot be answered given the database schema, return "I do not know"
- Database type is PostgreSQL

### Input:
Generate a SQL query that answers the question: ${question}.
This query will run on a database whose schema is represented in this string:

${buildSchema(schema)}

### Response:
Based on your instructions, here is the SQL query I have generated to answer the question: ${question}.
\`\`\`sql
`;
