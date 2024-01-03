import { ReactNode, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  // Footer,
  // Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { FC } from 'react';

import { ShukunLogo } from '@ailake/shared-ui';

export type DefaultLayoutProps = {
  //
  children: ReactNode
};

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navbar.Section>Home</Navbar.Section>
          <Navbar.Section>Reports</Navbar.Section>
          <Navbar.Section>Table Schemas</Navbar.Section>
          <Navbar.Section grow>Dashboards</Navbar.Section>

          <Navbar.Section>avatar</Navbar.Section>
        </Navbar>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Group sx={{ height: '100%' }} px={20} position="apart">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <ShukunLogo />
              <Text ml='xl'>
                shukun
              </Text>
            </div>


            <ActionIcon variant="default" size={30}>
              <IconSun size="1rem" />
              {/* : <IconMoonStars size="1rem" />} */}
            </ActionIcon>
          </Group>
          {/*  */}
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
      {/* {children} */}
    </AppShell>
  );
};
