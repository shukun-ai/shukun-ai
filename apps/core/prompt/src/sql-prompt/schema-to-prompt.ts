import { ColumnDefinition, TableDefinition } from '@shukun-ai/apitype';

export const buildSchema = (schema: { tables: TableDefinition[] }): string => {
  return buildTables(schema.tables);
};

const buildTables = (tables: TableDefinition[]): string => {
  return [
    tables.map((table) => buildTable(table)).join('\n'),
    buildReferences(tables),
  ].join('\n');
};

const buildTable = (table: TableDefinition): string => {
  return [
    `CREATE TABLE ${getTableName(table.tableName)} (`,
    buildColumns(table.columns),
    ');',
  ].join('\n');
};

const buildColumns = (columns: ColumnDefinition[]): string => {
  return columns.map((column) => `  ${buildColumn(column)}`).join('\n');
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

const buildColumn = (column: ColumnDefinition): string => {
  let columnString = `${getColumnName(column.columnName)} ${buildType(column)}`;

  const description: string[] = [];

  if (column.comment) {
    description.push(`${column.comment},`);
  }

  if (column.enums) {
    description.push(
      `This can only be one of the following values: [${buildEnumItems(
        column.enums
      )}].`
    );
  }

  if (description.length > 0) {
    columnString += `, -- ${description.join(' ')}`;
  } else {
    columnString += ',';
  }

  return columnString;
};

const buildType = (column: ColumnDefinition) => {
  return column.columnType;
};

const getTableName = (tableName: string) => {
  return `${tableName}`;
};

const getColumnName = (columnName: string) => {
  return columnName;
};

const buildReferences = (tables: TableDefinition[]): string => {
  return tables
    .map((table) => {
      return table.columns
        .map((column) => {
          if (column.reference) {
            return `-- ${getTableName(table.tableName)}.${getColumnName(
              column.columnName
            )} can be joined with ${getTableName(
              column.reference.tableName
            )}.${getColumnName(column.reference.columnName)}`;
          }
        })
        .filter((text) => text)
        .join('\n');
    })
    .join('\n');
};