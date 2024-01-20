import { ThreadRetrieveOutput } from '@ailake/apitype';
import { useCallback } from 'react';

export const useCreateMessage = (props: {
  thread: ThreadRetrieveOutput | null;
  setWaitingUserInput: React.Dispatch<React.SetStateAction<boolean>>;
  setWaitingAssistant: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { thread } = props;

  const createMessage = useCallback(
    (payload: { text: string }) => {
      if (!thread) {
        throw new Error('The thread is not created, create thread first.');
      }

      // const lastMessage = thread.messages[thread.messages.length - 1];

      //   switch (lastMessage.metadata.type) {
      //     case 'userTemplate':
      //       break;
      //     case 'assistantText':
      //   }
    },
    [thread]
  );

  return { createMessage };
};
