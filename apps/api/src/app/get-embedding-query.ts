import { ColumnDefinition, SchemaDefinition } from './schema';

export type Metadata = {
  tableName: string;
  columnName: string;
};

export const getEmbeddingQuery = (
  schema: SchemaDefinition
): {
  documents: string[];
  metadatas: Metadata[];
  ids: string[];
} => {
  const { tables } = schema;
  const embeddingQuery: {
    documents: string[];
    metadatas: Metadata[];
    ids: string[];
  } = {
    documents: [],
    metadatas: [],
    ids: [],
  };

  for (const table of tables) {
    for (const column of table.columns) {
      const document: string = `${getColumnAlias(column)}`;
      const metadata: Metadata = {
        tableName: table.tableName,
        columnName: column.columnName,
      };
      const id: string = `${table.tableName}.${column.columnName}`;
      embeddingQuery.documents.push(document);
      embeddingQuery.metadatas.push(metadata);
      embeddingQuery.ids.push(id);
    }
  }

  return embeddingQuery;
};

const getColumnAlias = (column: ColumnDefinition): string => {
  return column.columnAlias.length > 0
    ? column.columnAlias.join(' and ')
    : column.columnName;
};
