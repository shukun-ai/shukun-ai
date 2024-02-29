import {
  IconChevronDown,
  IconChevronRight,
  TablerIconsProps,
} from '@tabler/icons-react';

export type ArrowIconProps = TablerIconsProps & {
  open?: boolean;
};

export const ArrowIcon = ({ open, ...props }: ArrowIconProps) => {
  if (open) {
    return <IconChevronDown {...props} />;
  } else {
    return <IconChevronRight {...props} />;
  }
};
