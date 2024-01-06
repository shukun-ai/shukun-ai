import { Textarea, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { FC } from 'react';

type MessageInputProps = {
  loading?: boolean;
  [key: string]: unknown;
};

export const MessageInput: FC<MessageInputProps> = ({ loading, ...rest }) => {
  const theme = useMantineTheme();
  return (
    <Textarea
      wrapperProps={rest}
      disabled={loading}
      w={'calc(100vw - 200px)'}
      placeholder="Type your message..."
      minRows={2}
      rightSection={
        <ActionIcon
          variant="filled" // 给发送按钮一个背景色
          color='teal' // 背景色
          aria-label="Send message"
          radius="xl" // 圆角按钮
          size={36} // 按钮大小
          loading={loading}
          type='submit'
        >
          <IconSend color='white' />
        </ActionIcon>
      }
      rightSectionWidth={42} // 调整 rightSection 的宽度以适应按钮
      radius="xl" // 文本框圆角
      size="md" // 文本框大小
      mt="md" // 上边距
      styles={{
        input: {
          paddingRight: 0, // 右内边距设置为0，使按钮更贴近文本区域
          border: 0, // 移除边框
          boxShadow: theme.shadows.sm, // 轻微的阴影
          '&:focus': { boxShadow: `${theme.shadows.md} !important` }, // 聚焦时更明显的阴影
        },
        rightSection: {
          display: 'flex', // 弹性布局使按钮居中
          alignItems: 'center', // 垂直居中
          justifyContent: 'center', // 水平居中
          marginRight: theme.spacing.xs, // 给按钮一点右外边距
        },
      }}
    />
  );
}
