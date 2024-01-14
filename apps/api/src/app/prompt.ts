import { SchemaDefinition } from './schema';
import { buildSchema } from './schema-to-prompt';

export const getPrompt0 = (question: string, schema: SchemaDefinition) =>
  [
    '### Instructions',
    '- if the question cannot be answered given the database schema, return "I do not know"',
    '- only use the tables and columns in the schema above',
    '- Use Table Aliases, example: SELECT t.column_name FROM table_name AS t;',
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

export const getPrompt1 = (question: string, schema: SchemaDefinition) =>
  [
    '# Instructions:',
    'Your task is convert a question into a SQL query, given a Postgres database schema.',
    'Adhere to these rules:',
    '- **Deliberately go through the question and database schema word by word** to appropriately answer the question',
    '- **Use Table Aliases** to prevent ambiguity. For example, `SELECT table1.col1, table2.col1 FROM table1 JOIN table2 ON table1.id = table2.id`.',
    '- When creating a ratio, always cast the numerator as float',
    '',
    '# Input:',
    `Generate a SQL query that answers the questioq \`${question}\`.`,
    'This query will run on a database whose schema is represented in this string:',

    buildSchema(schema),

    '# Response:',
    'Based on your instructions, here is the SQL query I have generated to answer the question',
    '```sql',
  ].join('\n');

export const getPrompt2 = (question: string, schema: SchemaDefinition) =>
  [
    '### Task',
    'Generate a SQL query to answer the following question:',
    question,
    '',
    '### Database Schema',
    'This query will run on a database whose schema is represented in this string:',
    buildSchema(schema),
    '',
    '### SQL',
    `Given the database schema, here is the SQL query that answers ${question}:`,
    '```sql',
  ].join('\n');

export const getPrompt3 = (question: string, schema: SchemaDefinition) =>
  [
    '# Task',
    'Generate a SQL query to answer the following question:',
    '`' + question + '`',
    '',
    '# Database Schema',
    'The query will run on a database with the following schema:',
    buildSchema(schema),
    '',
    '# Instructions',
    '- Deliberately go through the question and database schema word by word to appropriately answer the question',
    '- Use Table Aliases to prevent ambiguity. For example, `SELECT table1.col1, table2.col1 FROM table1 JOIN table2 ON table1.id = table2.id`.',
    '- only use the tables and columns in the schema above',
    '- you can use CTEs to create temporary tables that can be used in your query',
    '- use the ILIKE operator when running WHERE queries against text columns',
    // '- when doing mathematical operations, remember to cast TEXT or STRING columns to float',
    '',
    '# SQL',
    '```sql',
  ].join('\n');

export const getPrompt = getPrompt0;
