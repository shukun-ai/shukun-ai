import { Avatar, Box } from '@mantine/core';
import { ConversationInput } from './components/conversation-input';
import { ConversationProvider } from './components/conversation-context';
import { ConversationList } from './components/conversation-list';
import { ConversationTip } from './components/conversation-tip';

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
        }}
      >
        <Box style={{ height: 12 }}></Box>
        <Box
          style={{
            maxWidth: 1440,
            display: 'flex',
            marginBottom: 20,
          }}
        >
          <Box style={{ marginRight: 20 }}>
            <Avatar radius="lg" color="blue">
              DC
            </Avatar>
          </Box>
          <ConversationInput />
        </Box>
        <Box style={{ marginBottom: 20 }}>
          <ConversationList />
        </Box>
        <Box>
          <ConversationTip />
        </Box>
      </Box>
    </ConversationProvider>
  );
};
