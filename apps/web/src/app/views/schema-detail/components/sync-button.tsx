import { SchemaSyncInput } from '@shukun-ai/apitype';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { syncSchema } from '../../../../apis/schema';
import { queryClient } from '../../../query-client';
import { useTranslation } from 'react-i18next';

export type SyncButtonProps = {
  schemaId: string;
};

export const SyncButton = ({ schemaId }: SyncButtonProps) => {
  const { t } = useTranslation();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: SchemaSyncInput) => {
      return syncSchema(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['retrieveSchema'],
      });
    },
  });

  return (
    <Button loading={isPending} onClick={() => mutateAsync({ schemaId })}>
      {t('schema.syncDb')}
    </Button>
  );
};
