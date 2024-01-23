import { TableList } from './components/table-list';
import { useQuery } from '@tanstack/react-query';
import { retrieveSchema } from '../../../apis/schema';
import { SchemaRetrieveOutput } from '@ailake/apitype';
import { useParams } from 'react-router-dom';
import { SyncButton } from './components/sync-button';
import { DbIcons, ErrorCard, PageSkeleton } from '@ailake/shared-ui';
import { EditButton } from './components/edit-button';
import { Box, Flex, Group, Text, Title } from '@mantine/core';

export const SchemaDetail = () => {
  const { schemaId } = useParams();

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

  if (isPending || !data) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorCard title={error.name} description={error.message} />;
  }

  return (
    <>
      <Flex justify="space-between">
        <Group>
          <DbIcons dbType={data.dbType} />
          <Box mb={20}>
            <Title order={3}>Schema Management</Title>
            <Text>{data.name}</Text>
          </Box>
        </Group>
        <Group mb={20}>
          <SyncButton schemaId={data.schemaId} />
          <EditButton schema={data} />
        </Group>
      </Flex>
      <TableList tables={data.tables} />
    </>
  );
};
