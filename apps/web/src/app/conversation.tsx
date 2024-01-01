import { Box } from '@mantine/core';
import { ConversationInput } from './conversation-input';
import { ConversationProvider } from './conversation-context';
import { ConversationList } from './conversation-list';

export type ConversationProps = {
  //
};

export const Conversation = () => {
  return (
    <ConversationProvider>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
        }}
      >
        <Box style={{ flex: 1 }}>
          <ConversationList />
        </Box>
        <Box style={{ height: 50, background: '#000' }}>
          <ConversationInput />
        </Box>
      </Box>
    </ConversationProvider>
  );
};
