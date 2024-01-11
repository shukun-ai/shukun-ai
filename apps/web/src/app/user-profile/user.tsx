import React from 'react';
import { Group, Avatar, Text, Box } from '@mantine/core';

export const User = () => {
  return (
    <Box pb="sm">
      <Group>
        <Avatar radius="lg" color="blue">
          DC
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={600}>
            davy chen
          </Text>
        </Box>
      </Group>
    </Box>
  );
};
