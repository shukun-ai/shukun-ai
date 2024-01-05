import { TableDefinition, ColumnDefinition } from './schema';

export const buildSchema = (schema: { tables: TableDefinition[] }): string => {
  return buildTables(schema.tables);
};

export const buildTables = (tables: TableDefinition[]): string => {
  return tables.map((table) => buildTable(table)).join('\n');
};

const buildTable = (table: TableDefinition): string => {
  return [
    `CREATE TABLE ${table.tableName} (`,
    buildColumns(table.columns, table.tableName),
    ');',
    `- Alias of ${table.tableName} is ${table.tableAlias.join(',')}`,
  ].join('\n');
};

const buildColumns = (
  columns: ColumnDefinition[],
  tableName: string
): string => {
  return columns
    .map((column) => `  ${buildColumn(column, tableName)}`)
    .join(',\n');
};

export const buildColumn = (
  column: ColumnDefinition,
  tableName: string
): string => {
  let columnString = `${column.columnName} ${buildType(column)}`;

  if (column.isPrimary) {
    columnString += ' PRIMARY KEY';
  }

  const description: string[] = [];

  if (column.columnAlias) {
    description.push(`Alias: ${column.columnAlias.join(',')}`);
  }

  if (column.comment) {
    description.push(`Description: ${column.comment}`);
  }

  if (column.reference) {
    description.push(
      `${tableName}.${column.columnName} can be joined with ${column.reference.tableName}.${column.reference.columnName}`
    );
  }

  if (description.length > 0) {
    columnString += ` "${description.join(', ')}"`;
  }

  return columnString;
};

export const buildType = (column: ColumnDefinition) => {
  switch (column.columnType) {
    case 'varchar':
      return `varchar(${column.precision ? column.precision : 20})`;
    case 'boolean':
      return 'bool';
    case 'enum':
      return `ENUM(${
        column.enums
          ? column.enums.map((e) => `${e.key}: ${e.label}`).join(',')
          : ''
      })`;
    case 'integer':
      return 'int';
    case 'float':
      return 'float8';
    case 'timestamp':
      return 'timestamptz';
  }
};
