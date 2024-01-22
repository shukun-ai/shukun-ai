export type SchemaRetrieveInput = {
  schemaId: string;
};

export type SchemaRetrieveOutput = {
  schemaId: string;
  name: string;
  tables: TableDefinition[];
  dbType: string;
  dbUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type SchemaListInput = {
  //
};

export type SchemaListOutput = {
  schemaId: string;
  name: string;
  dbType: string;
  createdAt: string;
  updatedAt: string;
}[];

export type SchemaCreateInput = {
  name: string;
  dbType: string;
  dbUrl: string;
};

export type SchemaCreateOutput = {
  schemaId: string;
};

export type SchemaUpdateInput = {
  schemaId: string;
  name?: string;
  tables?: TableDefinition[];
  dbType?: string;
  dbUrl?: string;
};

export type SchemaUpdateOutput = {
  schemaId: string;
};

export type SchemaRemoveInput = {
  schemaId: string;
};

export type SchemaRemoveOutput = {
  schemaId: string;
};

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
