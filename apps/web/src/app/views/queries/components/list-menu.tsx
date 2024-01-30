import {
  QueryListOutput,
  QueryRemoveInput,
  QueryUpdateInput,
} from '@shukun-ai/apitype';
import { ActionIcon, Menu } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { removeQuery, updateQuery } from '../../../../apis/query';
import { queryClient } from '../../../query-client';
import { useCallback } from 'react';
import { modals } from '@mantine/modals';
import { BasicForm } from './basic-form';
import { useTranslation } from 'react-i18next';

export type ListMenuProps = {
  query: QueryListOutput[number];
};

export const ListMenu = ({ query }: ListMenuProps) => {
  const { t } = useTranslation();

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationFn: (props: QueryUpdateInput) => {
      return updateQuery(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listQuery'],
      });
    },
  });

  const openUpdate = useCallback(() => {
    modals.open({
      title: t('query.updateModalTitle'),
      children: (
        <BasicForm
          initialValues={query}
          onSubmit={async (values) => {
            await editMutateAsync({
              queryId: query.queryId,
              name: values.name,
            });
            modals.closeAll();
          }}
        />
      ),
    });
  }, [editMutateAsync, query, t]);

  const { mutateAsync: removeMutateAsync } = useMutation({
    mutationFn: (props: QueryRemoveInput) => {
      return removeQuery(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listQuery'],
      });
    },
  });

  const openRemove = useCallback(() => {
    modals.openConfirmModal({
      title: t('query.removeModalTitle'),
      labels: { confirm: t('query.confirm'), cancel: t('query.cancel') },
      onConfirm: () =>
        removeMutateAsync({
          queryId: query.queryId,
        }),
    });
  }, [query.queryId, removeMutateAsync, t]);

  return (
    <Menu shadow="md" width={200} withinPortal>
      <Menu.Target>
        <ActionIcon>
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            openUpdate();
          }}
        >
          {t('query.setting')}
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            openRemove();
          }}
        >
          {t('query.delete')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
