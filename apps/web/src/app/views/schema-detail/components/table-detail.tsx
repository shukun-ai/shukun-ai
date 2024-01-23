import { useDisclosure } from '@mantine/hooks';
import {
  Group,
  Collapse,
  Box,
  ActionIcon,
  Button,
  Badge,
  Table,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from '@tabler/icons-react';
import { TableDefinition } from '@ailake/apitype';

export type TableDetailProps = {
  table: TableDefinition;
};

export const TableDetail = ({ table }: TableDetailProps) => {
  const [opened, { toggle }] = useDisclosure(true);
  const ArrowIcon = opened ? IconChevronDown : IconChevronRight;
  return (
    <Box mx="auto">
      <Group position="left" mb={5}>
        <Button
          onClick={toggle}
          leftIcon={<ArrowIcon size="1rem" />}
          variant="white"
        >
          {table.tableName}
        </Button>
        {table.tableAlias.map((alias) => (
          <Badge tt="none">{alias}</Badge>
        ))}
      </Group>

      <Collapse
        in={opened}
        transitionDuration={100}
        transitionTimingFunction="linear"
      >
        <Box pl={30}>
          <Table>
            <thead>
              <tr>
                <th>Column name</th>
                <th>Alias</th>
                <th>Type</th>
                <th>Foreign table</th>
                <th>Foreign column</th>
                <th>comments</th>
              </tr>
            </thead>
            <tbody>
              {table.columns.map((column) => (
                <tr>
                  <td>{column.columnName} </td>
                  <td>
                    <ActionIcon>
                      <IconPlus size="0.75rem" />
                    </ActionIcon>
                  </td>
                  <td>{column.columnType}</td>
                  <td>{column.reference?.tableName}</td>
                  <td>{column.reference?.columnName}</td>
                  <td>{column.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Collapse>
    </Box>
  );
};
