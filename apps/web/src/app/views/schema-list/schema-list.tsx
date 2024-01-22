import { IconTableShare } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { Breadcrumbs } from '../../layouts/bread-crumbs';
import { useQuery } from '@tanstack/react-query';
import { ErrorCard, PageSkeleton } from '@ailake/shared-ui';
import { listSchema } from '../../../apis/schema';
import { CardNew } from './components/card-new';
import { CardItem } from './components/card-item';

export const SchemaList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['listSchema'],
    queryFn: () => {
      return listSchema({});
    },
  });

  if (isPending) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorCard title={error.name} description={error.message} />;
  }

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: 'Databases',
            icon: <IconTableShare size="1rem" stroke={1.5} />,
          },
        ]}
      />
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <CardNew />
        {data.map((data) => (
          <CardItem key={data.schemaId} data={data} />
        ))}
      </Flex>
    </>
  );
};
