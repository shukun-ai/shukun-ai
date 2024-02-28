import {
  Card,
  ActionIcon,
  Center,
  useMantineTheme,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { BasicForm, BasicFormValuesProps } from './basic-form';
import { useMutation } from '@tanstack/react-query';
import { createSchema } from '../../../../apis/schema';
import { queryClient } from '../../../query-client';

export const CardNew = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync } = useMutation({
    mutationFn: (props: BasicFormValuesProps) => {
      return createSchema({
        name: props.name,
        connection: {
          type: props.type,
          database: props.database,
          user: props.user,
          password: props.password,
          port: props.port,
          host: props.host,
          schema: props.schema,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listSchema'],
      });
    },
  });

  const handleSubmit = async (values: BasicFormValuesProps) => {
    await mutateAsync(values);
    close();
  };

  return (
    <Card shadow="sm" padding="0" radius="md" withBorder w={240} h={110}>
      <Center w={240} h={110} mx="auto" onClick={open}>
        <ActionIcon
          color={theme.colors.dark[1]}
          size="xl"
          radius="xs"
          variant="transparent"
        >
          <IconPlus size="5.5rem" />
        </ActionIcon>
      </Center>
      <Modal opened={opened} onClose={close} title={t('schema.createTitle')}>
        <BasicForm onSubmit={handleSubmit} />
      </Modal>
    </Card>
  );
};
