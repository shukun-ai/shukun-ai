import { QueryCreateInput } from '@ailake/apitype';
import { ItemCard } from '@ailake/shared-ui';
import { Avatar } from '@mantine/core';
import { IconCubePlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { createQuery } from '../../../../apis/query';
import { queryClient } from '../../../query-client';
import { nanoid } from 'nanoid';

export type CreateButtonProps = {
  //
};

export const CreateButton = () => {
  const { t } = useTranslation();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryCreateInput) => {
      return createQuery(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listQuery'],
      });
    },
  });

  return (
    <ItemCard
      icon={
        <Avatar>
          <IconCubePlus size="1rem" />
        </Avatar>
      }
      title={t('query.create')}
      loading={isPending}
      onClick={() => {
        mutateAsync({
          name: nanoid(),
        });
      }}
    />
  );
};
