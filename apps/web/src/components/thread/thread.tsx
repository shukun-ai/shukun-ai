import { useThreadContext } from './thread-context';
import { InitialMessage } from './components/initial-message';
import { Messages } from './components/messages';
import { Box } from '@mantine/core';
import { UserInput } from './components/user-input';
import { AssistantLoading } from './components/assistant-loading';
import { useMemo } from 'react';

export type ThreadProps = {
  //
};

export const Thread = () => {
  const { thread } = useThreadContext();

  const lastMessageType = useMemo(() => {
    if (!thread) {
      return '';
    }
    return thread.messages[thread.messages.length - 1].metadata.type;
  }, [thread]);

  if (!thread) {
    return <InitialMessage />;
  }

  return (
    <Box>
      <Messages thread={thread} />
      {['assistantText'].includes(lastMessageType) && <UserInput />}
      {['userTemplate', 'userInput'].includes(lastMessageType) && (
        <AssistantLoading />
      )}
    </Box>
  );
};
