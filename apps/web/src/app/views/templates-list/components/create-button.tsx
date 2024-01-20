import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { createTemplate } from '../../../../apis/template';

export type CreateButtonProps = {
  //
};

export const CreateButton = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return createTemplate({
        name: 'new template',
        steps: [],
      });
    },
  });

  return (
    <Button loading={isPending} onClick={() => mutate()}>
      新建
    </Button>
  );
};
