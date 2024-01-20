import { useMutation } from '@tanstack/react-query';
import { createThread } from '../../../apis/thread';
import { ThreadCreateInput, ThreadRetrieveOutput } from '@ailake/apitype';
import { Dispatch, SetStateAction, useCallback } from 'react';

export const useCreateThread = ({
  setThread,
}: {
  setThread: Dispatch<SetStateAction<ThreadRetrieveOutput | null>>;
}) => {
  const { mutateAsync } = useMutation({
    mutationFn: (input: ThreadCreateInput) => {
      return createThread(input);
    },
  });

  const onCreateThread = useCallback(
    async (payload: { templateId: string }) => {
      const thread = await mutateAsync(payload);
      setThread(thread);
    },
    [mutateAsync, setThread]
  );

  return {
    onCreateThread,
  };
};
