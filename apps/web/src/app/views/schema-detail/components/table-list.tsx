import { Box } from '@mantine/core';
import { TableDetail } from './table-detail';
import { SchemaTable } from '@shukun-ai/apitype';

export type TableListProps = {
  tables: SchemaTable[];
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
