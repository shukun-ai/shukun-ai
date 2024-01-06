import { useState } from 'react';
import { Avatar } from '@mantine/core';
import {
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  // ActionIcon,
} from '@mantine/core';
// import { IconSun } from '@tabler/icons-react';
import { FC } from 'react';

import { ShukunLogo } from '@ailake/shared-ui';

type AppHeaderProps = {
  //
  onBurgerClicked: (opened: boolean) => void
};

export const AppHeader: FC<AppHeaderProps> = ({ onBurgerClicked }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <div
          style={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => {
                onBurgerClicked && onBurgerClicked(o)
                return !o
              })}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>

          <ShukunLogo />
          <Text ml="xl">shukun</Text>
        </div>

        {/* <ActionIcon variant="default" size={30}>
          <IconSun size="1rem" />
          : <IconMoonStars size="1rem" />}

        </ActionIcon> */}
        <Avatar color="cyan" radius="xl">DC</Avatar>
      </Group>
      {/*  */}
    </Header>
  );
};
