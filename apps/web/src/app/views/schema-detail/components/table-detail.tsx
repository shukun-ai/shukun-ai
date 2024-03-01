import { useDisclosure } from '@mantine/hooks';
import {
  Group,
  Collapse,
  Box,
  ActionIcon,
  Button,
  Badge,
  Table,
  Switch,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { SchemaColumn, SchemaTable } from '@shukun-ai/apitype';
import { ArrowIcon } from '@shukun-ai/shared-ui';

export type TableDetailProps = {
  table: SchemaTable;
  onChange: (table: SchemaTable) => void;
};

export const TableDetail = ({ table, onChange }: TableDetailProps) => {
  const { t } = useTranslation();
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <Box mx="auto">
      <Group position="left" mb={5}>
        <Button
          onClick={toggle}
          leftIcon={<ArrowIcon open={opened} size="1rem" />}
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
                <th>{t('schema.hidden')}</th>
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
                  <td>
                    <ColumnSwitch
                      column={column}
                      onChange={(newColumn) => {
                        const newTable = {
                          ...table,
                          columns: table.columns.map((oldColumn) => {
                            if (oldColumn.columnName === newColumn.columnName) {
                              return newColumn;
                            }
                            return oldColumn;
                          }),
                        };
                        onChange(newTable);
                      }}
                    />
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

const ColumnSwitch = ({
  column,
  onChange,
}: {
  column: SchemaColumn;
  onChange: (column: SchemaColumn) => void;
}) => {
  return (
    <Switch
      size="xs"
      checked={column.hidden}
      onChange={(event) => {
        onChange({
          ...column,
          hidden: event.target.checked,
        });
      }}
    />
  );
};
