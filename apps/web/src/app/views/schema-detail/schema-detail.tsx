import { IconTableShare } from '@tabler/icons-react';
import { Breadcrumbs } from '../../layouts/bread-crumbs';
import { TableList } from './components/table-list';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../query-client';
import { syncSchema } from '../../../apis/schema';
import { SchemaSyncInput } from '@ailake/apitype';
import { useParams } from 'react-router-dom';

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

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: SchemaSyncInput) => {
      return syncSchema(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listSchema'],
      });
    },
  });

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Button
        loading={isPending}
        onClick={() => schemaId && mutateAsync({ schemaId })}
      >
        同步数据库
      </Button>
      <TableList />
    </>
  );
};
