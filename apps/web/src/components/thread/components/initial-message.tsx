import { Box, Button, Paper, Text } from '@mantine/core';
import { useThreadContext } from '../thread-context';
import { DialogCard } from './dialog-card';
import { useCallback } from 'react';

export type InitialMessageProps = {
  //
};

export const InitialMessage = () => {
  const { templates, createThread } = useThreadContext();

  const onclick = useCallback(
    (template: { templateId: string; name: string }) => {
      createThread({
        templateId: template.templateId,
        templateName: template.name,
      });
    },
    [createThread]
  );

  return (
    <DialogCard avatarRole="assistant">
      <Paper
        style={{
          background: '#1F2D5C',
          padding: 20,
          borderRadius: 6,
          color: '#fff',
        }}
      >
        <Text size="sm" mb={20}>
          您可以点击下列问题助手，快速开始一个查询：
        </Text>
        {templates.map((template) => (
          <Box key={template.templateId} mb={8}>
            <Button
              variant="white"
              radius="lg"
              onClick={() => onclick(template)}
            >
              {template.name}
            </Button>
          </Box>
        ))}
      </Paper>
    </DialogCard>
  );
};
