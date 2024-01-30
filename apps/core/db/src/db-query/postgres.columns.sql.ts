export const listColumnsSql = (pgTableSchema = 'public') => `
WITH TableColumns AS (
    SELECT
        table_name,
        column_name,
        data_type,
    	character_maximum_length,
        numeric_precision,
        numeric_scale
    FROM
        information_schema.columns
    WHERE
        table_schema = '${pgTableSchema}'
),
ForeignKeyInfo AS (
    SELECT
        conname AS constraint_name,
        conrelid::regclass::text AS table_name,
        a.attname AS column_name,
        confrelid::regclass::text AS foreign_table_name,
        af.attname AS foreign_column_name
    FROM
        pg_constraint c
    JOIN
        pg_attribute a ON a.attnum = ANY(c.conkey) AND a.attrelid = c.conrelid
    JOIN
        pg_attribute af ON af.attnum = ANY(c.confkey) AND af.attrelid = c.confrelid
),
CommentsInfo AS (
	SELECT
	    c.relname AS table_name,
        a.attname AS column_name,
        d.description AS column_comment
    FROM
        pg_attribute a
        LEFT JOIN pg_description d ON a.attrelid = d.objoid AND a.attnum = d.objsubid
        LEFT JOIN pg_class c ON a.attrelid = c.oid
    WHERE
        a.attnum > 0
)
SELECT
    tc.table_name,
    tc.column_name,
    tc.data_type,
	tc.character_maximum_length,
	tc.numeric_precision,
	tc.numeric_scale,
    fki.constraint_name,
    fki.foreign_table_name,
    fki.foreign_column_name,
	ci.column_comment
FROM
    TableColumns tc
LEFT JOIN
    ForeignKeyInfo fki ON tc.table_name = fki.table_name AND tc.column_name = fki.column_name
LEFT JOIN
	CommentsInfo ci ON tc.table_name = ci.table_name AND tc.column_name = ci.column_name
ORDER BY
    tc.table_name, tc.column_name;
`;
