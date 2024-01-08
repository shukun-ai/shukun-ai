import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { cryptoPassword } from './private/crypto-password';
import { signAsync, verifyAsync } from './private/jwt';
import { addMilliseconds } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createJwt(props: {
    username: string;
    password: string;
    expired: number;
  }): Promise<{
    userId: string;
    username: string;
    accessToken: string;
    expiredAt: string;
  }> {
    const password = cryptoPassword(props.password);

    const expiredAt = addMilliseconds(new Date(), props.expired);

    const user = await this.userService.verifyUser({
      username: props.username,
      password,
    });

    const accessToken = await signAsync({
      username: props.username,
      userId: user.id,
      expired: expiredAt.getTime(),
    });

    return {
      userId: user.id,
      username: props.username,
      accessToken,
      expiredAt: expiredAt.toISOString(),
    };
  }

  verifyJwt(token: string): Promise<{
    username: string;
    userId: string;
    expired: number;
  }> {
    return verifyAsync(token);
  }

  async registerUser(props: {
    username: string;
    password: string;
  }): Promise<null> {
    const password = cryptoPassword(props.password);

    return await this.userService.registerUser({
      username: props.username,
      cryptoPassword: password,
    });
  }
}
