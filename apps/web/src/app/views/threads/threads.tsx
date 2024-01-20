import { ThreadProvider } from '../../../components/thread/thread-context';
import { Thread as BaseThread } from '../../../components/thread/thread';
import { TemplateListOutput, ThreadRetrieveOutput } from '@ailake/apitype';
import { useQuery } from '@tanstack/react-query';
import { listTemplate } from '../../../apis/template';
import { useState } from 'react';
import { threadMock } from './threads.mock';
import { Box } from '@mantine/core';

export type ThreadProps = {
  //
};

export const Thread = () => {
  const { data } = useQuery<TemplateListOutput>({
    queryKey: ['listTemplate'],
    queryFn: () => listTemplate({}),
  });

  const [, setThread] = useState<ThreadRetrieveOutput | null>(null);
  const [waitingUserInput] = useState<boolean>(false);
  const [waitingAssistant] = useState<boolean>(false);

  return (
    <ThreadProvider
      value={{
        thread: threadMock,
        templates: data ?? [],
        waitingUserInput,
        waitingAssistant,
        createThread: async (payload) => {
          setThread({
            threadId: 'th1',
            title: payload.templateName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            messages: [
              {
                messageId: 'm1',
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                metadata: {
                  type: 'userTemplate',
                  text: payload.templateName,
                },
              },
            ],
          });
        },
        createMessage: async () => {},
      }}
    >
      <Box style={{ width: 1200 }}>
        <BaseThread />
      </Box>
    </ThreadProvider>
  );
};
