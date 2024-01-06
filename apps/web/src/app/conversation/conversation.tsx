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
      <ConversationList />
      <ConversationTip />
      <ConversationInput />
    </ConversationProvider >
  );
};
