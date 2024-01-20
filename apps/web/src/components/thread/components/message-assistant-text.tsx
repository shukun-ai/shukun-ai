import { ThreadMessage, ThreadMessageAssistantText } from '@ailake/apitype';
import { Box, Text } from '@mantine/core';

export type MessageAssistantTextProps = {
  message: ThreadMessage;
  metadata: ThreadMessageAssistantText;
};

export const MessageAssistantText = ({
  metadata,
}: MessageAssistantTextProps) => {
  return (
    <Box pt={6}>
      <Text>{metadata.text}</Text>
    </Box>
  );
};
