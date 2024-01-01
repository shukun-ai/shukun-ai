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
          overflow: 'hidden',
        }}
      >
        <Box style={{ flex: 1, overflow: 'hidden', overflowY: 'scroll' }}>
          <ConversationList />
        </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            background: '#000',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <ConversationInput />
        </Box>
      </Box>
    </ConversationProvider>
  );
};
