import { Avatar, Box } from '@mantine/core';
import { ConversationInput } from './components/conversation-input';
import { ConversationProvider } from './components/conversation-context';
import { ConversationList } from './components/conversation-list';
import { ConversationTip } from './components/conversation-tip';
import mockFace from '../../assets/mock-face.png';

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
          maxWidth: 1440,
          overflowX: 'hidden',
        }}
      >
        <Box style={{ height: 12 }}></Box>
        <Box
          style={{
            display: 'flex',
            marginBottom: 20,
          }}
        >
          <Box style={{ marginRight: 20 }}>
            <Avatar radius="lg" color="blue">
              <img
                src={mockFace}
                alt="Davy Chen"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
              />
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
