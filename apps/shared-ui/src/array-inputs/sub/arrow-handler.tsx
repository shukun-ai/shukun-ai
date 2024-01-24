import { Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';

export type ArrowHandlerProps = {
  index: number;
  onMove: (sourceIndex: number, targetIndex: number) => void;
};

export const ArrowHandler = ({ index, onMove }: ArrowHandlerProps) => {
  return (
    <Stack spacing={0}>
      <Tooltip label="向上移动" withinPortal>
        <UnstyledButton
          onClick={() => {
            onMove(index, index - 1);
          }}
        >
          <IconArrowUp size="0.8rem" />
        </UnstyledButton>
      </Tooltip>
      <Tooltip label="向下移动" withinPortal>
        <UnstyledButton
          onClick={() => {
            onMove(index, index + 1);
          }}
        >
          <IconArrowDown size="0.8rem" />
        </UnstyledButton>
      </Tooltip>
    </Stack>
  );
};
