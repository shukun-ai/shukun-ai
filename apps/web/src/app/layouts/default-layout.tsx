import { ReactNode } from 'react';
import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import { FC } from 'react';
import { AppNavbar } from './navbar';

export type DefaultLayoutProps = {
  //
  children: ReactNode;
};

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  const theme = useMantineTheme();
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
      navbarOffsetBreakpoint={100}
      navbar={<AppNavbar />}
    >
      {children}
    </AppShell>
  );
};
