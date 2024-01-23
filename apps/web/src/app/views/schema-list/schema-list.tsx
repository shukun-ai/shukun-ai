import { Flex, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { ErrorCard, PageSkeleton } from '@ailake/shared-ui';
import { listSchema } from '../../../apis/schema';
import { CardNew } from './components/card-new';
import { CardItem } from './components/card-item';
import { useTranslation } from 'react-i18next';

export const SchemaList = () => {
  const { t } = useTranslation();

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
      <Title order={3} mb={20}>
        {t('schema.listTitle')}
      </Title>
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
