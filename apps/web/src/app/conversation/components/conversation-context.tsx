import React, { createContext, useContext } from 'react';
import { useObservableState } from 'observable-hooks';
import { Comment, Conversation, DataResult } from '@ailake/apitype';
import { conversationRepository } from '../../../repositories/conversation/conversation-repository';
import { commentRepository } from '../../../repositories/comment/comment-repository';
import { dataResultRepository } from '../../../repositories/data-result/data-result-repository';

type ConversationContextType = {
  state: {
    inputAskMessage: string;
    robotIsWorking: boolean;
    conversations: Conversation[];
    comments: Comment[];
    dataResults: DataResult[];
  };
  dispatch: {
    updateInputAskMessage: (props: { ask: string }) => void;
    createConversation: (props: { ask: string }) => Promise<void>;
  };
};

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

export const ConversationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const inputAskMessage = useObservableState(
    conversationRepository.inputAskMessage$,
    ''
  );
  const robotIsWorking = useObservableState(
    conversationRepository.robotIsWorking$,
    false
  );
  const conversations = useObservableState(conversationRepository.all$, []);
  const comments = useObservableState(commentRepository.all$, []);
  const dataResults = useObservableState(dataResultRepository.all$, []);

  return (
    <ConversationContext.Provider
      value={{
        state: {
          inputAskMessage,
          robotIsWorking,
          conversations,
          comments,
          dataResults,
        },
        dispatch: {
          updateInputAskMessage: conversationRepository.updateInputAskMessage,
          createConversation: conversationRepository.create,
        },
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      'useConversationContext must be used within a ConversationProvider'
    );
  }
  return context;
};
