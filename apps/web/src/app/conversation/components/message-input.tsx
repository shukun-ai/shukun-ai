import { Group, useMantineTheme, ActionIcon, TextInput } from '@mantine/core';
import { IconSend, IconQuestionMark } from '@tabler/icons-react';
import { FC } from 'react';

type MessageInputProps = {
  loading?: boolean;
  [key: string]: unknown;
};

export const MessageInput: FC<MessageInputProps> = ({ loading, ...rest }) => {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <TextInput
        {...rest}
        disabled={loading}
        w={600}
        styles={{
          input: {
            paddingRight: 0, // 右内边距设置为0，使按钮更贴近文本区域
            backgroundColor: theme.colors.gray[2],
            border: 0, // 移除边框
            boxShadow: theme.shadows.sm, // 轻微的阴影
            '&:focus': { boxShadow: `${theme.shadows.md} !important` }, // 聚焦时更明显的阴影
          },
        }}
      />
      <ActionIcon color="red" variant="filled" size="lg" type="submit">
        <IconSend size="1.3rem" />
      </ActionIcon>

      <ActionIcon variant="filled" size="lg">
        <IconQuestionMark size="1.3rem" />
      </ActionIcon>
    </Group>
  );
};
