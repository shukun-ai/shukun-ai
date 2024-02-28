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
import { dbTypes } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { SchemaConnection } from '@shukun-ai/apitype';
import { useState } from 'react';

export type BasicFormValuesProps = {
  schemaId?: string;
  name: string;
} & SchemaConnection;

export type BasicFormProps = {
  initialValues?: BasicFormValuesProps;
  onSubmit: (values: BasicFormValuesProps) => Promise<void>;
};

export const BasicForm = ({
  initialValues = {
    name: '',
    type: 'postgres',
    database: '',
    user: '',
    password: undefined,
    port: 5432,
    host: '127.0.0.1',
    schema: undefined,
  },
  onSubmit,
}: BasicFormProps) => {
  const { t } = useTranslation();

  const [pending, setPending] = useState(false);

  const form = useForm<BasicFormValuesProps>({
    initialValues,
    validate: zodResolver(
      z.object({
        type: z.string().min(1),
        database: z.string().min(1),
        user: z.string().min(1).optional(),
        password: z.string().min(1).optional(),
        port: z.number().int().optional(),
        host: z.string().min(1),
        schema: z.string().min(1).optional(),
      })
    ),
  });

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setPending(true);
          try {
            await onSubmit(values);
          } finally {
            setPending(false);
          }
        })}
      >
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
          mb="md"
          placeholder="5432"
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
          mb="md"
          placeholder="postgres"
          {...form.getInputProps('user')}
        />

        <TextInput
          label={t('schema.connection.password')}
          mb="md"
          placeholder="Enter password"
          {...form.getInputProps('password')}
        />

        <Group position="right" mt="md">
          <Button type="submit" loading={pending}>
            {t('schema.submit')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
