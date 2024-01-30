import { Group, Avatar, Text, Box } from '@mantine/core';
import mockFace from '../../assets/mock-face.png';
import { LanguageSwitch } from '@shukun-ai/shared-ui';

export const User = () => {
  return (
    <Box pb="sm">
      <Group>
        <Avatar radius="lg" color="blue">
          <img
            src={mockFace}
            alt="Davy Chen"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
          />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Text color="#fff" size="sm" weight={600}>
            davy chen
          </Text>
        </Box>
        <Box>
          <LanguageSwitch />
        </Box>
      </Group>
    </Box>
  );
};
