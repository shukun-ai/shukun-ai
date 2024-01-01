import { Box } from '@mantine/core';
import { ConversationInput } from './conversation-input';

export type ConversationProps = {
  //
};

export const Conversation = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box style={{ flex: 1 }} />
      <Box style={{ height: 50, background: '#000' }}>
        <ConversationInput />
      </Box>
    </Box>
  );
};
