import { QueryRetrieveOutput, QueryUpdateInput } from '@ailake/apitype';
import { Box, Button, Flex, Title } from '@mantine/core';
import { updateQuery } from '../../../../apis/query';
import { useMutation } from '@tanstack/react-query';
import { Metadata } from './metadata';
import { useDetailContext } from './detail-context';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

export type DetailProps = {
  query: QueryRetrieveOutput;
};

export const Detail = ({ query }: DetailProps) => {
  const { t } = useTranslation();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryUpdateInput) => {
      return updateQuery(props);
    },
  });

  const { setMetadata, generatedStepIndex } = useDetailContext();

  return (
    <form>
      <Box>
        <Flex justify="space-between">
          <Box>
            <Title order={3}>{t('query.detailTitle')}</Title>
            <Title order={6} mb="md">
              {query.name}
            </Title>
          </Box>
          <Button
            loading={isPending}
            onClick={async () => {
              if (generatedStepIndex !== query.metadata.steps.length - 1) {
                notifications.show({
                  title: t('query.saveNotificationTitle'),
                  message: t('query.saveNotificationMessage'),
                  color: 'red',
                  autoClose: 5000,
                });
                return;
              }
              await mutateAsync(query);
            }}
          >
            {t('query.save')}
          </Button>
        </Flex>
      </Box>

      <Metadata
        value={query.metadata}
        onChange={(metadata) => {
          setMetadata(metadata);
        }}
      />
    </form>
  );
};
