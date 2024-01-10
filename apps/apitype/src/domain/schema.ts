export type UniqueSchemaName = string;
export type UniqueTableName = string;
export type UniqueColumnName = string;

export type SchemaDomain = {
  id: string;
  name: UniqueSchemaName;
  type: string;
  url: string;
  secretKey: string;
  tables: Record<UniqueTableName, SchemaDomainTable>;
};

export type SchemaDomainTable = {
  tableName: UniqueTableName;
  tableDescription?: string;
  columns: Record<UniqueColumnName, SchemaDomainColumn>;
};

export type SchemaDomainColumn = {
  columnName: UniqueColumnName;
  columnType: string;
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
