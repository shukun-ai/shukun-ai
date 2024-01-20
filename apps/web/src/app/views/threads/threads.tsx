import { ThreadProvider } from '../../../components/thread/thread-context';
import { Thread as BaseThread } from '../../../components/thread/thread';
import { TemplateListOutput, ThreadRetrieveOutput } from '@ailake/apitype';
import { useQuery } from '@tanstack/react-query';
import { listTemplate } from '../../../apis/template';
import { useState } from 'react';
import { Box } from '@mantine/core';
import { useCreateThread } from './create-thread.hook';
import { useCreateMessage } from './create-message.hook';

export type ThreadProps = {
  //
};

export const Thread = () => {
  const { data } = useQuery<TemplateListOutput>({
    queryKey: ['listTemplate'],
    queryFn: () => listTemplate({}),
  });

  const [thread, setThread] = useState<ThreadRetrieveOutput | null>(null);
  const [waitingUserInput, setWaitingUserInput] = useState<boolean>(false);
  const [waitingAssistant] = useState<boolean>(false);

  const { onCreateThread } = useCreateThread({ setThread });
  const { onCreateMessage } = useCreateMessage({
    thread,
    setThread,
    setWaitingUserInput,
  });

  return (
    <ThreadProvider
      value={{
        thread: thread,
        templates: data ?? [],
        waitingUserInput,
        waitingAssistant,
        createThread: async (payload) => onCreateThread(payload),
        createMessage: async (payload) => onCreateMessage(payload),
      }}
    >
      <Box style={{ width: 1200 }}>
        <BaseThread />
      </Box>
    </ThreadProvider>
  );
};
