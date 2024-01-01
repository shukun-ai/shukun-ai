import React, { createContext, useCallback, useState, useContext } from 'react';
import {
  Comment,
  Conversation,
  DataResult,
  conversations,
  comments,
  dataResults,
} from '@ailake/apitype';

type ConversationContextType = {
  state: {
    robotIsWorking: boolean;
    conversations: Conversation[];
    comments: Comment[];
    dataResults: DataResult[];
  };
  dispatch: {
    waitRobot: () => void;
    robotIsDone: () => void;
  };
};

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

export const ConversationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [robotIsWorking, setRobotIsWorking] = useState(false);

  const waitRobot = useCallback(() => {
    setRobotIsWorking(true);
  }, []);

  const robotIsDone = useCallback(() => {
    setRobotIsWorking(false);
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        state: { robotIsWorking, conversations, comments, dataResults },
        dispatch: { waitRobot, robotIsDone },
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
