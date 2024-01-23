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
import { useTranslation } from 'react-i18next';

export type TableDetailProps = {
  table: TableDefinition;
};

export const TableDetail = ({ table }: TableDetailProps) => {
  const { t } = useTranslation();
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
          {t('schema.tableName')}: {table.tableName}
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
                <th>{t('schema.columnName')}</th>
                <th>{t('schema.alias')}</th>
                <th>{t('schema.type')}</th>
                <th>{t('schema.foreignTable')}</th>
                <th>{t('schema.foreignColumn')}</th>
                <th>{t('schema.comments')}</th>
              </tr>
            </thead>
            <tbody>
              {table.columns.map((column) => (
                <tr>
                  <td style={{ width: 250 }}>{column.columnName}</td>
                  <td style={{ width: 250 }}>
                    <ActionIcon>
                      <IconPlus size="0.75rem" />
                    </ActionIcon>
                  </td>
                  <td style={{ width: 250 }}>{column.columnType}</td>
                  <td style={{ width: 200 }}>{column.reference?.tableName}</td>
                  <td style={{ width: 200 }}>{column.reference?.columnName}</td>
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
