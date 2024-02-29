import {
  Alert,
  Badge,
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  Group,
  Modal,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SchemaRetrieveOutput, SchemaTable } from '@shukun-ai/apitype';
import { useQuery } from '@tanstack/react-query';
import { retrieveSchema } from '../../../../apis/schema';
import { ArrowIcon, ErrorCard, PageSkeleton } from '@shukun-ai/shared-ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type SelectTablesProps = {
  schemaId: string | undefined;
  value: string[] | undefined;
  onChange: (tableNames: string[]) => void;
};

export const SelectTables = ({
  schemaId,
  value = [],
  onChange,
}: SelectTablesProps) => {
  const { t } = useTranslation();

  const [opened, { open, close }] = useDisclosure(false);

  const { isPending, error, data } = useQuery<SchemaRetrieveOutput | undefined>(
    {
      queryKey: ['retrieveSchema', schemaId],
      queryFn: async () => {
        if (schemaId) {
          return await retrieveSchema({
            schemaId,
          });
        }
      },
    }
  );

  if (isPending) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorCard title="Wrong" />;
  }

  if (!data) {
    return <ErrorCard title="Did not choose schema" />;
  }

  return (
    <Flex>
      <Button variant="light" onClick={open}>
        {t('query.chooseSchema')}
      </Button>
      <Box
        style={{ flex: 1, marginLeft: 8, border: 'solid 1px #ccc', padding: 2 }}
      >
        {value?.map((tableName) => (
          <TableBadge
            key={tableName}
            tables={data.tables}
            tableName={tableName}
          />
        ))}
      </Box>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title={t('query.chooseSchema')}
      >
        <TableModal
          tables={data.tables}
          tableNames={value}
          onSubmit={(chosenTableNames) => {
            onChange(chosenTableNames);
            close();
          }}
        />
      </Modal>
    </Flex>
  );
};

type TableModalProps = {
  tables: SchemaTable[];
  tableNames: string[];
  onSubmit: (tableNames: string[]) => void;
};

const TableModal = ({ tables, tableNames, onSubmit }: TableModalProps) => {
  const { t } = useTranslation();

  const [chosenTable, setChosenTable] = useState<string>();

  const [chosenTableNames, setChosenTableNames] =
    useState<string[]>(tableNames);

  const disabledChosenTableNames = useMemo(() => {
    return chosenTableNames.length >= 5;
  }, [chosenTableNames.length]);

  return (
    <Box>
      {disabledChosenTableNames && (
        <Box mb={20}>
          <Alert>{t('query.maxTablesTip')}</Alert>
        </Box>
      )}
      {tables
        .filter((table) => !table.hidden)
        .map((table) => (
          <Box>
            <Group>
              <Checkbox
                value={table.tableName}
                checked={chosenTableNames.includes(table.tableName)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setChosenTableNames((prev) => [...prev, table.tableName]);
                  } else {
                    setChosenTableNames((prev) =>
                      prev.filter((name) => name !== table.tableName)
                    );
                  }
                }}
                disabled={
                  !chosenTableNames.includes(table.tableName) &&
                  disabledChosenTableNames
                }
              />
              <UnstyledButton
                style={{ display: 'flex', flex: 1 }}
                onClick={() => {
                  setChosenTable((prev) =>
                    prev === table.tableName ? undefined : table.tableName
                  );
                }}
              >
                <Box style={{ flex: 1 }}>
                  <TableLabel
                    tableName={table.tableName}
                    tableAlias={table.tableAlias}
                  />
                </Box>
                <ArrowIcon open={chosenTable === table.tableName} size="1rem" />
              </UnstyledButton>
            </Group>
            <Collapse in={chosenTable === table.tableName}>
              <Box ml={40}>
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
                    {table.columns
                      .filter((column) => !column.hidden)
                      .map((column) => (
                        <tr>
                          <td style={{ width: 250 }}>{column.columnName}</td>
                          <td style={{ width: 250 }}>
                            {column.columnAlias.join(', ')}
                          </td>
                          <td style={{ width: 250 }}>{column.columnType}</td>
                          <td style={{ width: 200 }}>
                            {column.reference?.tableName}
                          </td>
                          <td style={{ width: 200 }}>
                            {column.reference?.columnName}
                          </td>
                          <td>{column.comment}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Box>
            </Collapse>
          </Box>
        ))}
      <Group>
        <Button onClick={() => onSubmit(chosenTableNames)}>
          {t('query.confirm')}
        </Button>
        <Button onClick={() => onSubmit(tableNames)}>
          {t('query.cancel')}
        </Button>
      </Group>
    </Box>
  );
};

const TableLabel = ({
  tableName,
  tableAlias,
}: {
  tableName: string;
  tableAlias: string[];
}) => {
  if (tableAlias.length > 0) {
    return (
      <Group>
        <Text>{tableAlias[0]}</Text>
        <Badge tt="none">({tableName})</Badge>
      </Group>
    );
  } else {
    return (
      <Group>
        <Text>{tableName}</Text>
      </Group>
    );
  }
};

const TableBadge = ({
  tables,
  tableName,
}: {
  tables: SchemaTable[];
  tableName: string;
}) => {
  const alias = useMemo(() => {
    const table = tables.find((table) => table.tableName === tableName);
    if (!table) {
      return '';
    }
    if (table.tableAlias.length > 0) {
      return table.tableAlias[0];
    }
    return table.tableName;
  }, [tableName, tables]);

  return (
    <Badge size="sm" tt="none">
      {alias}
    </Badge>
  );
};
