import { SchemaColumn, SchemaTable } from '@shukun-ai/apitype';

export const buildSchema = (schema: { tables: SchemaTable[] }): string => {
  return buildTables(schema.tables);
};

const buildTables = (tables: SchemaTable[]): string => {
  return [
    tables.map((table) => buildTable(table)).join('\n'),
    buildReferences(tables),
  ].join('\n');
};

const buildTable = (table: SchemaTable): string => {
  return [
    `CREATE TABLE ${getTableName(table.tableName)} (`,
    buildColumns(table.columns),
    ');',
  ].join('\n');
};

const buildColumns = (columns: SchemaColumn[]): string => {
  return columns.map((column) => `  ${buildColumn(column)}`).join('\n');
};

const buildEnumItems = (enums: NonNullable<SchemaColumn['enums']>): string => {
  return enums
    .map((enumItem) => {
      return `'${enumItem.key}'`;
    })
    .join(',');
};

const buildColumn = (column: SchemaColumn): string => {
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

const buildType = (column: SchemaColumn) => {
  return column.columnType;
};

const getTableName = (tableName: string) => {
  const isAllLowercase = /^[a-z][a-z0-9]*$/.test(tableName);
  return isAllLowercase ? tableName : `"${tableName}"`;
};

const getColumnName = (columnName: string) => {
  const isAllLowercase = /^[a-z][a-z0-9]*$/.test(columnName);
  return isAllLowercase ? columnName : `"${columnName}"`;
};

const buildReferences = (tables: SchemaTable[]): string => {
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
          } else {
            return undefined;
          }
        })
        .filter((text) => text)
        .join('\n');
    })
    .join('\n');
};
