import { ThreadRetrieveOutput } from '@ailake/apitype';
import { Box } from '@mantine/core';
import { Message } from './message';

export type MessagesProps = {
  thread: ThreadRetrieveOutput;
};

export const Messages = ({ thread }: MessagesProps) => {
  return (
    <Box>
      {thread.messages.map((message) => (
        <Box key={message.messageId} mb={20}>
          <Message message={message} />
        </Box>
      ))}
    </Box>
  );
};
