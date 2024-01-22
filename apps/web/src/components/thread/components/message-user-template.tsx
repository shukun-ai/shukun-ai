import { ThreadMessage, ThreadMessageUserTemplate } from '@ailake/apitype';
import { Box, Text } from '@mantine/core';

export type MessageUserTemplateProps = {
  message: ThreadMessage;
  metadata: ThreadMessageUserTemplate;
};

export const MessageUserTemplate = ({ metadata }: MessageUserTemplateProps) => {
  return (
    <Box pt={6}>
      <Text>{metadata.text}</Text>
    </Box>
  );
};
