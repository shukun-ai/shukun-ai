import { IconTableShare } from '@tabler/icons-react';
import { Breadcrumbs } from '../../layouts/bread-crumbs';
import { TableList } from './components/table-list';
import { useQuery } from '@tanstack/react-query';
import { retrieveSchema } from '../../../apis/schema';
import { SchemaRetrieveOutput } from '@ailake/apitype';
import { useParams } from 'react-router-dom';
import { SyncButton } from './components/sync-button';
import { ErrorCard, PageSkeleton } from '@ailake/shared-ui';
import { EditButton } from './components/edit-button';
import { Group } from '@mantine/core';

export const SchemaDetail = () => {
  const { schemaId } = useParams();

  const breadcrumbs = [
    {
      label: 'Databases',
      icon: <IconTableShare size="1rem" stroke={1.5} />,
    },
    {
      label: 'pending....',
    },
  ];

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
      <Breadcrumbs items={breadcrumbs} />
      <Group>
        <SyncButton schemaId={data.schemaId} />
        <EditButton schema={data} />
      </Group>
      <TableList />
    </>
  );
};
