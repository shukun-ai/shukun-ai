import React from 'react';
import { Group, Avatar, Text, Box } from '@mantine/core';

export const User = () => {
  return (
    <Box pb='sm'>
      <Group>
        <Avatar radius="xl" >dc</Avatar>
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            davy chen
          </Text>
          <Text color="dimmed" size="xs">
            davy@gmail.com
          </Text>
        </Box>
      </Group>
    </Box>
  );
}
