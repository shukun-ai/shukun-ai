import { TableDefinition, ColumnDefinition } from './schema';

export const buildSchema = (schema: { tables: TableDefinition[] }): string => {
  return buildTables(schema.tables);
};

export const buildTables = (tables: TableDefinition[]): string => {
  return [tables.map((table) => buildTable(table)).join('\n')].join('\n');
};

const buildTable = (table: TableDefinition): string => {
  return [
    `CREATE TABLE ${getTableName(table.tableName)} (`,
    buildColumns(table.columns),
    ');',
  ].join('\n');
};

const buildColumns = (columns: ColumnDefinition[]): string => {
  return columns.map((column) => `  ${buildColumn(column)}`).join(',\n');
};

const buildEnumItems = (
  enums: NonNullable<ColumnDefinition['enums']>
): string => {
  return enums
    .map((enumItem) => {
      return `'${enumItem.key}'`;
    })
    .join(',');
};

export const buildColumn = (column: ColumnDefinition): string => {
  let columnString = `${getColumnName(column.columnName)} ${buildType(column)}`;

  const description: string[] = [];

  if (column.comment) {
    description.push(`${column.comment}.`);
  }

  if (column.reference) {
    description.push(
      `This can be joined with ${getTableName(
        column.reference.columnName
      )} column in the ${getTableName(
        column.reference.tableName
      )} table and select ${column.reference.displayColumnName} column.`
    );
  }

  if (column.enums) {
    description.push(
      `This can only be one of the following values: [${buildEnumItems(
        column.enums
      )}].`
    );
  }

  if (description.length > 0) {
    columnString += ` "${description.join(' ')}"`;
  }

  return columnString;
};

export const buildType = (column: ColumnDefinition) => {
  switch (column.columnType) {
    case 'varchar':
      return 'text';
    case 'boolean':
      return 'bool';
    case 'enum':
      return 'text';
    case 'integer':
      return 'numeric';
    case 'float':
      return 'numeric';
    case 'timestamp':
      return 'timestamp';
  }
};

const getTableName = (tableName: string) => {
  return `table_${tableName}`;
};

const getColumnName = (columnName: string) => {
  return columnName;
};
