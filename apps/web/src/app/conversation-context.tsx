import React, { createContext, useCallback, useState } from 'react';

type ConversationContextType = {
  state: {
    robotIsWorking: boolean;
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
        state: { robotIsWorking },
        dispatch: { waitRobot, robotIsDone },
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
