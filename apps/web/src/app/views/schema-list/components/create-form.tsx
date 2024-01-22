import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Select, Button, Group, Box, Textarea } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { createSchema } from '../../../../apis/schema';
import { dbTypes } from '../../../constants';
import { queryClient } from '../../../query-client';

export type CreateFormProps = {
  onSubmitSuccess?: () => void;
};

export const CreateForm = ({ onSubmitSuccess }: CreateFormProps) => {
  const form = useForm<CreateFormValuesProps>({
    initialValues: {
      name: '',
      dbType: '',
      dbUrl: '',
    },
    validate: zodResolver(
      z.object({
        name: z.string().min(1),
        dbType: z.string().min(1),
        dbUrl: z.string().min(1),
      })
    ),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: CreateFormValuesProps) => {
      return createSchema(props);
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
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          withAsterisk
          mb="md"
          placeholder="Enter name"
          {...form.getInputProps('name')}
        />

        <Select
          label="Type"
          withAsterisk
          mb="md"
          placeholder="Select type"
          data={Object.values(dbTypes)}
          {...form.getInputProps('dbType')}
        />

        <Textarea
          label="URL"
          withAsterisk
          mb="md"
          placeholder="Enter URL"
          {...form.getInputProps('dbUrl')}
        />

        <Group position="right" mt="md">
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export type CreateFormValuesProps = {
  schemaId?: string;
  name: string;
  dbType: string;
  dbUrl: string;
};
