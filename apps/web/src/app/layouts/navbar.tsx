import { useState } from 'react';
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
  Image
} from '@mantine/core';
import { User } from '../user-profile/user';
import logo from '../../assets/light-logo-en.png'

export const AppNavbar = () => {
  const theme = useMantineTheme();
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
        <Image src={logo} alt="shukun" maw={180} />
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
