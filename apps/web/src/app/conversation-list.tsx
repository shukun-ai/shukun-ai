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
      {conversations.map((conversation) => (
        <Box
          key={conversation.id}
          style={{ border: 'solid 1px #eee', padding: 20 }}
        >
          <ConversationComments conversationId={conversation.id} />
        </Box>
      ))}
    </Box>
  );
};
