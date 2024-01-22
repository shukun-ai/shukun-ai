import { NavLink } from '@mantine/core';

type BreadcrumbsProps = {
  items: {
    label: string;
    icon?: React.ReactNode;
  }[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) =>
  items.map((item, i) => (
    <NavLink
      label={item.label}
      variant="light"
      w={125}
      icon={item.icon}
      childrenOffset={30}
    />
  ));
