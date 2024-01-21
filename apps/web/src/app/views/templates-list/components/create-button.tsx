import {
  Avatar,
  Card,
  Grid,
  Group,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { createTemplate } from '../../../../apis/template';
import { IconCubePlus } from '@tabler/icons-react';

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
    <Grid.Col span={3}>
      <UnstyledButton onClick={() => {}} style={{ width: '100%' }}>
        <Card
          withBorder
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 150,
          }}
          radius="md"
        >
          <Group>
            <Avatar>
              <IconCubePlus size="1rem" />
            </Avatar>
            <Title order={5}>创建新的助理</Title>
          </Group>
        </Card>
      </UnstyledButton>
    </Grid.Col>
  );
};
