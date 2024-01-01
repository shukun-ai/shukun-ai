import { Box, Button, Input } from '@mantine/core';
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
    <Box style={{ flex: 1 }}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Box style={{ display: 'flex' }}>
          <Input
            type="text"
            {...form.getInputProps('ask')}
            style={{
              width: '100%',
              marginRight: 20,
            }}
            disabled={robotIsWorking}
          />
          <Button type="submit" size="sm">
            发送
          </Button>
        </Box>
      </form>
    </Box>
  );
};
