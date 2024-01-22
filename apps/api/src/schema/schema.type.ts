export type SchemaDefinition = {
  tables: TableDefinition[];
  dbType: string;
  dbUrl: string;
};

export type TableDefinition = {
  tableName: string;
  tableAlias: string[];
  columns: ColumnDefinition[];
};

export type ColumnDefinition = {
  columnName: string;
  columnAlias: string[];
  columnType:
    | 'varchar'
    | 'integer'
    | 'float'
    | 'boolean'
    | 'timestamp'
    | 'enum';
  precision?: number;
  scale?: number;
  enums?: {
    key: string;
    label: string;
  }[];
  columnDefault?: unknown;
  notNullable?: boolean;
  isPrimary?: boolean;
  isUnique?: boolean;
  isIndexed?: boolean;
  comment?: string;
  reference?: {
    tableName: string;
    columnName: string;
    displayColumnName: string;
  };
};
