import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconCubePlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { createTemplate } from '../../../../apis/template';
import { queryClient } from '../../../query-client';
import { TemplateCreateInput } from '@ailake/apitype';
import { useTranslation } from 'react-i18next';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useDisclosure } from '@mantine/hooks';

export type CreateButtonProps = {
  //
};

export const CreateButton = () => {
  const { t } = useTranslation();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Grid.Col span={3}>
      <UnstyledButton onClick={open} style={{ width: '100%' }}>
        <Card
          withBorder
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 150,
          }}
          radius="md"
        >
          <Group>
            <Avatar>
              <IconCubePlus size="1rem" />
            </Avatar>
            <Title order={5}>{t('template.create')}</Title>
          </Group>
        </Card>
      </UnstyledButton>
      <Modal opened={opened} onClose={close} title={t('template.createTitle')}>
        <CreateForm initialValues={{ name: '' }} onSubmitSuccess={close} />
      </Modal>
    </Grid.Col>
  );
};

type CreateFormProps = {
  initialValues: CreateFormValuesProps;
  onSubmitSuccess?: () => void;
};

const CreateForm = ({ initialValues, onSubmitSuccess }: CreateFormProps) => {
  const { t } = useTranslation();

  const form = useForm<CreateFormValuesProps>({
    initialValues: initialValues,
    validate: zodResolver(
      z.object({
        name: z.string().min(1),
      })
    ),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: TemplateCreateInput) => {
      return createTemplate(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listTemplate'],
      });
    },
  });

  const handleSubmit = async (values: CreateFormValuesProps) => {
    await mutateAsync({ steps: [], ...values });
    onSubmitSuccess && onSubmitSuccess();
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('template.name')}
          withAsterisk
          mb="md"
          {...form.getInputProps('name')}
        />

        <Group position="right" mt="md">
          <Button type="submit" loading={isPending}>
            {t('template.submit')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

type CreateFormValuesProps = {
  name: string;
};
