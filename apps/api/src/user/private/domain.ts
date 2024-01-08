type IdString = string;
type ISOString = string;

export type UserDomain = {
  id: IdString;
  username: string; // @unique
  createdAt?: ISOString;
  updatedAt?: ISOString;
};

export type UserAO = {
  id: IdString;
  username: string;
  password: string;
  createdAt: ISOString;
  updatedAt: ISOString;
};

export const toDomain = (userAo: UserAO): UserDomain => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...other } = userAo;
  return other;
};
