import { FC, useState } from 'react';
import { IconWorldSearch, IconReportAnalytics, IconTableShare, IconArtboard } from '@tabler/icons-react';
import { NavLink, Navbar, useMantineTheme } from '@mantine/core';


export type AppNavbarProps = {
  hidden: boolean;
};

export const AppNavbar: FC<AppNavbarProps> = ({ hidden }) => {
  const theme = useMantineTheme();
  const [active, setActive] = useState(0);

  const data = [
    { icon: IconWorldSearch, label: '探索', description: '问您想问题的, 给您想看的', iconColor: theme.colors.pink[5] },
    {
      icon: IconReportAnalytics,
      label: '报表',
      iconColor: theme.colors.teal[5],
    },
    { icon: IconTableShare, label: '建模', iconColor: theme.colors.violet[5] },
    { icon: IconArtboard, label: '大屏', iconColor: theme.colors.blue[5] }
  ];

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      // rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} color={item.iconColor} />}
      onClick={() => setActive(index)}
    />
  ));


  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!hidden}
      pt={20}
      width={{ sm: 200, lg: 300 }}
    >
      {items}

    </Navbar>
  )
}
