export const getPromptTemplate = (task: string, schema: string) =>
  [
    '# Instructions',
    '- if the question cannot be answered given the database schema, return "I do not know"',
    '- only use the tables and columns in the database schema below',
    '- Use Table Aliases, example: SELECT t.column_name FROM table_name AS t;',
    '- Ensure that table names and column names are enclosed in double quotes if they are not all lowercase',
    '# Task',
    'Generate a SQL query to answer the following question:',
    task,
    '# Database Schema',
    'The query will run on a database with the following schema:',
    '```',
    schema,
    '```',
    '# Answer',
    '```sql',
  ].join('\n');
