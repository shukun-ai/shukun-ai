export const authPath = {
  createJwt: '/create-jwt',
};

export type CreateJwtDto = {
  username: string;
  password: string;
  remember?: boolean;
};

export type CreateJwtResponse = {
  username: string;
  userId: string;
  accessToken: string;
  expiredAt: string;
};
