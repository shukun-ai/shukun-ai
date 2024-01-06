import { useForm } from '@mantine/form';
import { useCallback, useEffect } from 'react';
import { useConversationContext } from './conversation-context';
import { MessageInput } from './message-input';

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
    <form onSubmit={form.onSubmit(onSubmit)} style={{ width: '100%' }}>
      <MessageInput
        placeholder="问我关于你想查的数据，如前十条任务的机场代码分布是什么？"
        {...form.getInputProps('ask')}
        loading={robotIsWorking}
      />
    </form>
  );
};
