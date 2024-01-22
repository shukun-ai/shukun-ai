import { useDisclosure } from '@mantine/hooks';
import { Group, Collapse, Box, Space, ActionIcon, Button } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconTrashOff,
  IconPencil,
} from '@tabler/icons-react';

export const TableDetail = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const ArrowIcon = opened ? IconChevronUp : IconChevronDown;
  return (
    <Box mx="auto">
      <Group position="left" mb={5}>
        <Button onClick={toggle} leftIcon={<ArrowIcon />} variant="white">
          这里是table名字
        </Button>
        <Space w="" />
        <Group>
          <ActionIcon variant="transparent">
            <IconPencil size="1rem" />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <IconTrashOff size="1rem" />
          </ActionIcon>
        </Group>
      </Group>

      <Collapse
        in={opened}
        transitionDuration={100}
        transitionTimingFunction="linear"
      >
        这里是很多 很多 form item
      </Collapse>
    </Box>
  );
};
