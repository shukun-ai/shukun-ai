import {
  Navbar,
} from '@mantine/core';
import { FC } from 'react';


export type AppNavbarProps = {
  hidden: boolean;
};

export const AppNavbar: FC<AppNavbarProps> = ({ hidden }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!hidden}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section>Home</Navbar.Section>
      <Navbar.Section>Reports</Navbar.Section>
      <Navbar.Section>Table Schemas</Navbar.Section>
      <Navbar.Section grow>Dashboards</Navbar.Section>

      <Navbar.Section>avatar</Navbar.Section>
    </Navbar>
  );
};
