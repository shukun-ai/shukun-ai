import { ThreadMessage, ThreadMessageUserInput } from '@ailake/apitype';
import { Box, Text } from '@mantine/core';

export type MessageUserInputProps = {
  message: ThreadMessage;
  metadata: ThreadMessageUserInput;
};

export const MessageUserInput = ({ metadata }: MessageUserInputProps) => {
  return (
    <Box pt={6}>
      <Text>{metadata.text}</Text>
    </Box>
  );
};
