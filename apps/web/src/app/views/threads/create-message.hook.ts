import { MessageCreateInput, ThreadRetrieveOutput } from '@ailake/apitype';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { createMessage } from '../../../apis/message';

export const useCreateMessage = (props: {
  thread: ThreadRetrieveOutput | null;
  setThread: Dispatch<SetStateAction<ThreadRetrieveOutput | null>>;
  setWaitingUserInput: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { thread, setThread, setWaitingUserInput } = props;

  const { mutateAsync } = useMutation({
    mutationFn: (input: MessageCreateInput) => {
      return createMessage(input);
    },
  });

  const onCreateMessage = useCallback(
    async (payload: { text: string }) => {
      if (!thread) {
        throw new Error('Thread is not set');
      }

      setWaitingUserInput(true);

      const lastMessage = thread.messages[thread.messages.length - 1];

      if (lastMessage.metadata.type !== 'assistantText') {
        throw new Error('Last message is not assistantText');
      }

      const messages = await mutateAsync({
        threadId: thread.threadId,
        role: 'user',
        metadata: {
          type: 'userInput',
          text: payload.text,
          inputKey: lastMessage.metadata.inputKey,
        },
      });

      setThread((thread) => {
        if (!thread) {
          return thread;
        }

        return {
          ...thread,
          messages: [
            ...thread.messages,
            messages.userMessage,
            messages.assistantMessage,
          ],
        };
      });
    },
    [mutateAsync, setThread, setWaitingUserInput, thread]
  );

  return { onCreateMessage };
};
