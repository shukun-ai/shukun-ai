import { Box, Divider } from '@mantine/core';
import { useConversationContext } from './conversation-context';
import { ConversationComments } from './conversation-comments';

export type ConversationListProps = {
  //
};

export const ConversationList = () => {
  const { state } = useConversationContext();
  const { conversations } = state;

  return (
    <Box>
      {conversations.map((conversation, index) => (
        <Box key={conversation.id}>
          <ConversationComments conversationId={conversation.id} />
          {index !== conversations.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};
