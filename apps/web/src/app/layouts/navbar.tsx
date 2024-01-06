import { FC, useState } from 'react';
import { IconWorldSearch, IconReportAnalytics, IconTableShare, IconArtboard } from '@tabler/icons-react';
import { NavLink, Navbar, ScrollArea, useMantineTheme } from '@mantine/core';

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
    <Navbar
      pt={20}
      width={{ sm: 100, xs: 100 }}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {items}
      </Navbar.Section>
      {/* <Navbar.Section>-</Navbar.Section> */}
    </Navbar>
  )
}
