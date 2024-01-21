export const getPrompt = (task: string) =>
  [
    '# Instructions',
    '- if the question cannot be answered given the database schema, return "I do not know"',
    '- only use the tables and columns in the schema above',
    '- Use Table Aliases, example: SELECT t.column_name FROM table_name AS t;',
    '# Task',
    'Generate a SQL query to answer the following question:',
    task,
    '# Database Schema',
    'The query will run on a database with the following schema:',
    '```',
    `CREATE TABLE public.gross_profit (
        id integer NOT NULL,
        sale_name character varying(100) NOT NULL,
        sale_rate numeric(6,4),
        amount numeric(9,2),
        standard_rate numeric(6,4)
    );
    
    CREATE TABLE public.aging (
        invoice_type character varying(100),
        invoice_number character varying(100),
        invoice_date date,
        invoice_status character varying(100),
        invoice_amount numeric(9,2),
        billing_amount numeric(9,2),
        day_30_amount numeric(9,2),
        day_60_amount numeric(9,2),
        day_90_amount numeric(9,2),
        day_120_amount numeric(9,2),
        day_more_than_120_amount numeric(9,2),
        sale_name character varying(100)
    );`,
    '```',
    '# Answer',
    '```sql',
  ].join('\n');
