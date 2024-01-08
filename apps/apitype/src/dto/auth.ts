export const authPath = {
  createJwt: '/auth/create-jwt',
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
