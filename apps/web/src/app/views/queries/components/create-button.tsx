import { QueryCreateInput } from '@shukun-ai/apitype';
import { ItemCard } from '@shukun-ai/shared-ui';
import { Avatar } from '@mantine/core';
import { IconCubePlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { createQuery } from '../../../../apis/query';
import { queryClient } from '../../../query-client';
import { useCallback } from 'react';
import { modals } from '@mantine/modals';
import { BasicForm } from './basic-form';

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

  const open = useCallback(() => {
    modals.open({
      title: t('query.createModalTitle'),
      children: (
        <BasicForm
          onSubmit={async (values) => {
            await mutateAsync({
              name: values.name,
            });
            modals.closeAll();
          }}
        />
      ),
    });
  }, [mutateAsync, t]);

  return (
    <ItemCard
      icon={
        <Avatar>
          <IconCubePlus size="1rem" />
        </Avatar>
      }
      title={t('query.createModalTitle')}
      loading={isPending}
      onClick={open}
    />
  );
};
