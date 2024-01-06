import { ReactNode, useState } from 'react';
import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import { FC } from 'react';
import { AppHeader } from './header';
import { AppNavbar } from './navbar';

export type DefaultLayoutProps = {
  //
  children: ReactNode;
};

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  const theme = useMantineTheme();
  const [navbarVisible, setNavbarVisible] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppNavbar hidden={!navbarVisible} />}
      header={<AppHeader onBurgerClicked={(open: boolean) => setNavbarVisible(open)} />}
    >
      {children}
    </AppShell>
  );
};
