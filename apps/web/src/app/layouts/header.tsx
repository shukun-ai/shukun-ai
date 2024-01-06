import { Avatar } from '@mantine/core';
import {
  Header,
  Text,
  Group,
} from '@mantine/core';
import { FC } from 'react';

import { ShukunLogo } from '@ailake/shared-ui';

export const AppHeader: FC = () => {
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <div
          style={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          <ShukunLogo />
          <Text ml="xl">shukun</Text>
        </div>
        <Avatar color="cyan" radius="xl">DC</Avatar>
      </Group>
    </Header>
  );
};
