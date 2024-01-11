import { useState } from 'react';
import {
  IconWorldSearch,
  IconReportAnalytics,
  IconTableShare,
} from '@tabler/icons-react';
import {
  NavLink,
  Navbar,
  ScrollArea,
  createStyles,
  useMantineTheme,
  Text,
} from '@mantine/core';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '../user-profile/user';
import logo from '../../assets/light-logo-en.png';

export const AppNavbar = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [active, setActive] = useState('');
  const data = [
    {
      icon: IconWorldSearch,
      label: t('navbar.explore'),
      iconColor: theme.colors.blue[5],
      path: '/',
    },
    {
      icon: IconReportAnalytics,
      label: t('navbar.reports'),
      iconColor: theme.colors.blue[5],
      path: '/reports',
    },
    {
      icon: IconTableShare,
      label: t('navbar.schema'),
      iconColor: theme.colors.blue[5],
      path: '/databases',
    },
  ];
  const { classes } = useStyles();

  const items = data.map((item, index) => (
    <RouterNavLink
      key={item.label}
      to={item.path}
      className={({ isActive, isPending }) => {
        if (isActive) {
          setActive(item.label);
        }
        return classes.navMenu;
      }}
    >
      <NavLink
        active={item.label === active}
        label={item.label}
        variant="light"
        icon={<item.icon size="1rem" stroke={1.5} color={item.iconColor} />}
        childrenOffset={30}
      />
    </RouterNavLink>
  ));

  return (
    <Navbar width={{ sm: 280, xs: 100 }}>
      <Navbar.Section
        id="11"
        mt="xs"
        mb="xs"
        className={classes.logoSection}
        pb="md"
      >
        <img src={logo} alt="SHUKUN AI" style={{ width: 120 }} />
        <Text fw="bold" pb={2}>
          AI Explore
        </Text>
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {items}
      </Navbar.Section>
      <Navbar.Section pl={10} pr={10}>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
  },
  navMenu: {
    textDecoration: 'none',
  },
}));
