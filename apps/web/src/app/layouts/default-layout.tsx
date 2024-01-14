import { AppShell, useMantineTheme } from '@mantine/core';
import { AppNavbar } from './navbar';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.white,
        },
      }}
      navbarOffsetBreakpoint={100}
      navbar={<AppNavbar />}
    >
      <Outlet />
    </AppShell>
  );
};
