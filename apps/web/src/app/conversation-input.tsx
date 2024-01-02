import { Box, Button, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useEffect } from 'react';
import { useConversationContext } from './conversation-context';

export type ConversationInputProps = {
  //
};

export const ConversationInput = () => {
  const { state, dispatch } = useConversationContext();
  const { inputAskMessage, robotIsWorking } = state;

  const form = useForm({
    initialValues: {
      ask: '',
    },
  });

  const onSubmit = useCallback(() => {
    dispatch.createConversation(form.values);
  }, [dispatch, form]);

  useEffect(() => {
    form.setFieldValue('ask', inputAskMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputAskMessage]);

  return (
    <Paper
      style={{
        flex: 1,
        background: '#fff',
        padding: '5px 10px',
        borderRadius: 0,
        boxShadow: '0px 2px 2px rgba(0,0,0,0.1)',
      }}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Box style={{ display: 'flex' }}>
          <input
            type="text"
            {...form.getInputProps('ask')}
            style={{
              width: '100%',
              marginRight: 20,
              border: 'none',
            }}
            disabled={robotIsWorking}
            placeholder="问我关于你想查的数据，如前十条任务的机场代码分布是什么？"
          />
          <Button type="submit" size="sm" variant="white">
            发送
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
