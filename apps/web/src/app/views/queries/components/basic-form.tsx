import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export type BasicFormValuesProps = {
  name: string;
};

export type BasicFormProps = {
  initialValues?: BasicFormValuesProps;
  onSubmit: (values: BasicFormValuesProps) => Promise<void>;
};

export const BasicForm = ({ initialValues, onSubmit }: BasicFormProps) => {
  const { t } = useTranslation();

  const [pending, setPending] = useState(false);

  const form = useForm<BasicFormValuesProps>({
    initialValues,
    validate: zodResolver(
      z.object({
        name: z.string().min(1),
      })
    ),
  });

  return (
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
      <Box>
        <TextInput
          label={t('query.name')}
          withAsterisk
          mb="md"
          placeholder={t('query.namePlaceholder')}
          {...form.getInputProps('name')}
        />

        <Group position="right" mt="md">
          <Button type="submit" loading={pending}>
            {t('query.submit')}
          </Button>
        </Group>
      </Box>
    </form>
  );
};
