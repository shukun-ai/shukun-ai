import { Box, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';

export type ConversationInputProps = {
  //
};

export const ConversationInput = () => {
  const form = useForm({
    initialValues: {
      ask: '',
    },
  });

  const onSubmit = useCallback(() => {
    console.log(form.values);
  }, [form.values]);

  return (
    <Box>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Input
          type="text"
          {...form.getInputProps('ask')}
          style={{ width: '100%' }}
        />
      </form>
    </Box>
  );
};
