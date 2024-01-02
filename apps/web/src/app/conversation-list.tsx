import { Box } from '@mantine/core';
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
        </Box>
      ))}
    </Box>
  );
};
