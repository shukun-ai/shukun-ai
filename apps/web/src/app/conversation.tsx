import { Avatar, Box } from '@mantine/core';
import { ConversationInput } from './conversation-input';
import { ConversationProvider } from './conversation-context';
import { ConversationList } from './conversation-list';
import { ShukunLogo } from './shukun-logo';
import { ConversationTip } from './conversation-tip';

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
          background: '#f2f2f2',
        }}
      >
        <Box style={{ height: 12 }}></Box>
        <Box
          style={{
            display: 'flex',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Box style={{ marginRight: 20 }}>
            <Avatar>
              <ShukunLogo />
            </Avatar>
          </Box>
          <ConversationInput />
        </Box>
        <Box style={{ flex: 1, overflow: 'hidden', overflowY: 'scroll' }}>
          <ConversationList />
          <ConversationTip />
        </Box>
      </Box>
    </ConversationProvider>
  );
};
