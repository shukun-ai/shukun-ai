import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  TextInput,
  Select,
  Button,
  Group,
  Box,
  Textarea,
  Modal,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { updateSchema } from '../../../../apis/schema';
import { dbTypes } from '../../../constants';
import { queryClient } from '../../../query-client';
import { useDisclosure } from '@mantine/hooks';
import { SchemaConnection, SchemaRetrieveOutput } from '@shukun-ai/apitype';
import { extractDifference } from '@shukun-ai/utils';
import { useTranslation } from 'react-i18next';

export type EditButtonProps = {
  schema: SchemaRetrieveOutput;
};

export const EditButton = ({ schema }: EditButtonProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button variant="subtle" onClick={open}>
        {t('schema.editDbUrl')}
      </Button>
      <Modal opened={opened} onClose={close} title={t('schema.editTitle')}>
        <EditButtonForm
          initialValues={{
            schemaId: schema.schemaId,
            name: schema.name,
            ...schema.connection,
          }}
          onSubmitSuccess={close}
        />
      </Modal>
    </>
  );
};

type EditButtonFormProps = {
  initialValues: EditButtonFormValuesProps;
  onSubmitSuccess?: () => void;
};

const EditButtonForm = ({
  initialValues,
  onSubmitSuccess,
}: EditButtonFormProps) => {
  const { t } = useTranslation();

  const form = useForm<EditButtonFormValuesProps>({
    initialValues: initialValues,
    validate: zodResolver(
      z.object({
        name: z.string().min(1),
        dbType: z.string().min(1),
        dbUrl: z.string().min(1),
      })
    ),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: EditButtonFormValuesProps) => {
      return updateSchema({
        ...extractDifference(initialValues, {
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
        }),
        schemaId: props.schemaId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['retrieveSchema'],
      });
    },
  });

  const handleSubmit = async (values: EditButtonFormValuesProps) => {
    mutateAsync(values);
    onSubmitSuccess && onSubmitSuccess();
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('schema.name')}
          withAsterisk
          mb="md"
          placeholder="Enter name"
          {...form.getInputProps('name')}
        />

        <Select
          label={t('schema.dbType')}
          withAsterisk
          mb="md"
          placeholder="Select type"
          data={Object.values(dbTypes)}
          {...form.getInputProps('dbType')}
        />

        <Textarea
          label={t('schema.dbUrl')}
          withAsterisk
          mb="md"
          placeholder="Enter URL"
          {...form.getInputProps('dbUrl')}
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

type EditButtonFormValuesProps = {
  schemaId: string;
  name: string;
} & SchemaConnection;
