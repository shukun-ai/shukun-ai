import { SchemaRetrieveOutput, SchemaUpdateInput } from '@shukun-ai/apitype';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { updateSchema } from '../../../../apis/schema';
import { queryClient } from '../../../query-client';
import { useTranslation } from 'react-i18next';

export type SaveButtonProps = {
  schema: SchemaRetrieveOutput;
};

export const SaveButton = ({ schema }: SaveButtonProps) => {
  const { t } = useTranslation();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: SchemaUpdateInput) => {
      return updateSchema(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['retrieveSchema'],
      });
    },
  });

  return (
    <Button loading={isPending} onClick={() => mutateAsync(schema)}>
      {t('schema.saveTables')}
    </Button>
  );
};
