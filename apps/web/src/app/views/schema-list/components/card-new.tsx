import {
  Card,
  ActionIcon,
  Center,
  useMantineTheme,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { CreateForm } from './create-form';

export const CardNew = () => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Card shadow="sm" padding="0" radius="md" withBorder w={240} h={110}>
      <Center w={240} h={110} mx="auto" onClick={open}>
        <ActionIcon
          color={theme.colors.dark[1]}
          size="xl"
          radius="xs"
          variant="transparent"
        >
          <IconPlus size="5.5rem" />
        </ActionIcon>
      </Center>
      <Modal opened={opened} onClose={close} title="Create new database">
        <CreateForm onSubmitSuccess={close} />
      </Modal>
    </Card>
  );
};
