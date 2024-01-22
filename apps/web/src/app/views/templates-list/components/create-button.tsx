import {
  Avatar,
  Card,
  Grid,
  Group,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconCubePlus } from '@tabler/icons-react';

export type CreateButtonProps = {
  //
};

export const CreateButton = () => {
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
