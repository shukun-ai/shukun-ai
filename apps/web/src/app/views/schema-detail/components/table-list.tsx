import { Box } from '@mantine/core';
import { TableDetail } from './table-detail';
import { TableDefinition } from '@shukun-ai/apitype';

export type TableListProps = {
  tables: TableDefinition[];
};

export const TableList = ({ tables }: TableListProps) => {
  return (
    <Box>
      {tables.map((table) => (
        <TableDetail table={table} />
      ))}
    </Box>
  );
};
