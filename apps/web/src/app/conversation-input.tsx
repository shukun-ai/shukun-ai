import { Box, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { useConversationContext } from './conversation-context';

export type ConversationInputProps = {
  //
};

export const ConversationInput = () => {
  const { state, dispatch } = useConversationContext();
  const { robotIsWorking } = state;

  const form = useForm({
    initialValues: {
      ask: '',
    },
  });

  const onSubmit = useCallback(() => {
    dispatch.createConversation(form.values).finally(() => {
      form.setFieldValue('ask', '');
    });
  }, [dispatch, form]);

  return (
    <Box>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Input
          type="text"
          {...form.getInputProps('ask')}
          style={{ width: '100%' }}
          disabled={robotIsWorking}
        />
      </form>
    </Box>
  );
};
