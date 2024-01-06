import { Group, Box, ScrollArea } from '@mantine/core';
import { FC } from 'react';

type ConversationBoxProps = {
  conversationList: JSX.Element;
  conversationInput: JSX.Element;
};

export const ConversationBox: FC<ConversationBoxProps> = ({
  conversationList,
  conversationInput
}) => {
  return (
    <Box pb={50} pos='relative'>
      <ScrollArea h='calc(100vh - 120px)'>
        {conversationList}
      </ScrollArea>
      <Box mt="md" pos='absolute' bottom={0} w='100%' h={50} >
        <Group >
          {conversationInput}
        </Group>
      </Box>
    </Box >
  );
}
