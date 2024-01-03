import { Avatar, Box } from '@mantine/core';
import { ConversationInput } from './components/conversation-input';
import { ConversationProvider } from './components/conversation-context';
import { ConversationList } from './components/conversation-list';
import { ConversationTip } from './components/conversation-tip';
import { ShukunLogo } from '@ailake/shared-ui';

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
            maxWidth: 1440,
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
        <Box
          style={{
            flex: 1,
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <ConversationList />
          <ConversationTip />
        </Box>
      </Box>
    </ConversationProvider>
  );
};
