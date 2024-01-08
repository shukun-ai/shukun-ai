import { sign, verify } from 'jsonwebtoken';

const privateKey =
  process.env?.['AUTH_PRIVATE_KEY'] || 'Please_set_privateKey_in_.env_first';

type JwtPayload = {
  username: string;
  userId: string;
  expired: number;
};

export const signAsync = (payload: JwtPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(payload, privateKey, {}, (err, token) => {
      if (err || !token) {
        return reject(err);
      }
      return resolve(token);
    });
  });
};

export const verifyAsync = async (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    verify(token, privateKey, (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') {
        return reject(new Error('JWT is invalid'));
      }
      return resolve(decoded as JwtPayload);
    });
  });
};
