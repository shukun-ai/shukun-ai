import { Box } from '@mantine/core';
import { TableDetail } from './table-detail';
import { SchemaTable } from '@shukun-ai/apitype';

export type TableListProps = {
  tables: SchemaTable[];
  onChange: (tables: SchemaTable[]) => void;
};

export const TableList = ({ tables, onChange }: TableListProps) => {
  return (
    <Box>
      {tables.map((table) => (
        <TableDetail
          table={table}
          onChange={(newTable) => {
            const newTables = tables.map((table) => {
              if (table.tableName === newTable.tableName) {
                return newTable;
              } else {
                return table;
              }
            });
            onChange(newTables);
          }}
        />
      ))}
    </Box>
  );
};
