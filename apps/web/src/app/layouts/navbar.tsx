import { FC, useState } from 'react';
import {
  IconWorldSearch,
  IconReportAnalytics,
  IconTableShare,
  IconArtboard,
} from '@tabler/icons-react';
import {
  NavLink,
  Navbar,
  ScrollArea,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { ShukunLogo } from '@ailake/shared-ui';
import { User } from '../user-profile/user';

export const AppNavbar: FC = () => {
  const theme = useMantineTheme();
  console.log(theme.breakpoints);
  const [active, setActive] = useState(0);
  const data = [
    { icon: IconWorldSearch, label: '探索', iconColor: theme.colors.pink[5] },
    {
      icon: IconReportAnalytics,
      label: '报表',
      iconColor: theme.colors.teal[5],
    },
    { icon: IconTableShare, label: '建模', iconColor: theme.colors.violet[5] },
    { icon: IconArtboard, label: '大屏', iconColor: theme.colors.blue[5] },
  ];
  const { classes } = useStyles();

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      icon={<item.icon size="1rem" stroke={1.5} color={item.iconColor} />}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar pt={20} width={{ sm: 280, xs: 100 }}>
      <Navbar.Section mt="xs" mb="xs" className={classes.logoSection}>
        <ShukunLogo />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {items}
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
