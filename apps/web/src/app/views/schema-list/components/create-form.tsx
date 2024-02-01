import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  TextInput,
  Select,
  Button,
  Group,
  Box,
  NumberInput,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { createSchema } from '../../../../apis/schema';
import { dbTypes } from '../../../constants';
import { queryClient } from '../../../query-client';
import { useTranslation } from 'react-i18next';
import { SchemaConnection } from '@shukun-ai/apitype';

export type CreateFormProps = {
  onSubmitSuccess?: () => void;
};

export const CreateForm = ({ onSubmitSuccess }: CreateFormProps) => {
  const { t } = useTranslation();

  const form = useForm<CreateFormValuesProps>({
    initialValues: {
      name: '',
      type: 'postgres',
      database: '',
      user: '',
      password: '',
      port: 5432,
      host: '127.0.0.1',
      schema: undefined,
    },
    validate: zodResolver(
      z.object({
        type: z.string().min(1),
        database: z.string().min(1),
        user: z.string().min(1),
        password: z.string().min(1),
        port: z.number().int(),
        host: z.string().min(1),
        schema: z.string().min(1).optional(),
      })
    ),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: CreateFormValuesProps) => {
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

  const handleSubmit = async (values: CreateFormValuesProps) => {
    mutateAsync(values);
    onSubmitSuccess && onSubmitSuccess();
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('schema.name')}
          withAsterisk
          mb="md"
          placeholder="Enter name"
          {...form.getInputProps('name')}
        />

        <Select
          label={t('schema.connection.type')}
          withAsterisk
          mb="md"
          placeholder="Select type"
          data={Object.values(dbTypes)}
          {...form.getInputProps('type')}
        />

        <TextInput
          label={t('schema.connection.host')}
          withAsterisk
          mb="md"
          placeholder="Enter host"
          {...form.getInputProps('host')}
        />

        <NumberInput
          label={t('schema.connection.port')}
          withAsterisk
          mb="md"
          placeholder="Enter port"
          {...form.getInputProps('port')}
        />

        <TextInput
          label={t('schema.connection.database')}
          withAsterisk
          mb="md"
          placeholder="Enter database"
          {...form.getInputProps('database')}
        />

        <TextInput
          label={t('schema.connection.user')}
          withAsterisk
          mb="md"
          placeholder="Enter user"
          {...form.getInputProps('user')}
        />

        <TextInput
          label={t('schema.connection.password')}
          withAsterisk
          mb="md"
          placeholder="Enter password"
          {...form.getInputProps('password')}
        />

        <Group position="right" mt="md">
          <Button type="submit" loading={isPending}>
            {t('schema.submit')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export type CreateFormValuesProps = {
  schemaId?: string;
  name: string;
} & SchemaConnection;
