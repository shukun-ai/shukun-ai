import { Avatar, AvatarProps } from '@mantine/core';
import { getDbIcons } from './db-icons.svg';

export type DbIconsProps = {
  dbType: string;
} & AvatarProps;

export const DbIcons = ({ dbType, ...avatarProps }: DbIconsProps) => {
  return (
    <Avatar
      variant="filled"
      radius="sm"
      {...avatarProps}
      src={getDbIcons(dbType)}
    />
  );
};
