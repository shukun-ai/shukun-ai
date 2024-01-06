import { ConversationInput } from './components/conversation-input';
import { ConversationProvider } from './components/conversation-context';
import { ConversationList } from './components/conversation-list';
// import { ConversationTip } from './components/conversation-tip';
import { ConversationBox } from './components/conversation-box';

export type ConversationProps = {
  //
};

export const Conversation = () => {
  return (
    <ConversationProvider>
      <ConversationBox
        conversationList={<ConversationList />}
        conversationInput={<ConversationInput />}
      />
    </ConversationProvider>
  );
};
