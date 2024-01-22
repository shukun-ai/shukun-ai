import { TemplateListOutput, ThreadRetrieveOutput } from '@ailake/apitype';
import { createContext, useContext } from 'react';

type ThreadContextType = {
  thread: ThreadRetrieveOutput | null;
  templates: TemplateListOutput;
  waitingUserInput: boolean;
  waitingAssistant: boolean;
  createThread: (payload: {
    templateId: string;
    templateName: string;
  }) => Promise<void>;
  createMessage: (payload: { text: string }) => Promise<void>;
};

const ThreadContext = createContext<ThreadContextType | null>(null);

export const ThreadProvider = ThreadContext.Provider;

export const useThreadContext = () => {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error('useThreadContext must be used within a ThreadProvider');
  }
  return context;
};
