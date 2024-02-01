import { SchemaColumn, SchemaTable } from '@shukun-ai/apitype';
import { PgColumnsSchema } from './postgres.columns.type';

export const pgColumnsConvertor = (input: PgColumnsSchema): SchemaTable[] => {
  const tableRecord: Record<string, SchemaTable> = input.rows.reduce(
    (total, next) => {
      const tableDefinition: SchemaTable = {
        tableName: next.table_name,
        tableAlias: [],
        columns: [],
      };

      return {
        ...total,
        [next.table_name]: tableDefinition,
      };
    },
    {}
  );

  input.rows.forEach((column) => {
    const columnDefinition: SchemaColumn = {
      columnName: column.column_name,
      columnAlias: [],
      columnType: column.data_type,
      characterLength: column.character_maximum_length ?? undefined,
      precision: column.numeric_precision ?? undefined,
      scale: column.numeric_scale ?? undefined,
      enums: [],
      columnDefault: undefined,
      notNullable: undefined,
      isPrimary: undefined,
      isUnique: undefined,
      isIndexed: undefined,
      comment: column.column_comment ?? undefined,
      reference:
        column.foreign_table_name && column.foreign_column_name
          ? {
              tableName: column.foreign_table_name,
              columnName: column.foreign_column_name,
              displayColumnName: column.foreign_column_name,
            }
          : undefined,
    };

    tableRecord[column.table_name].columns.push(columnDefinition);
  });

  return Object.values(tableRecord);
};
