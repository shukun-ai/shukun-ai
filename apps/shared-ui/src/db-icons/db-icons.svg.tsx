import PgIcon from './pg.svg';

export const dbIcons = {
  PgIcon,
};

export const getDbIcons = (type: string) => {
  switch (type) {
    case 'postgres':
      return PgIcon;
    default:
      return PgIcon;
  }
};
