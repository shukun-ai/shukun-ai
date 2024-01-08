import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserAO, UserDomain, toDomain } from './private/domain';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  private users: UserAO[] = [];

  onApplicationBootstrap() {
    this.users.push({
      id: '1',
      username: 'superadmin',
      password: 'superadmin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async verifyUser(props: {
    username: string;
    password: string;
  }): Promise<UserDomain> {
    const user = this.users.find(
      (user) =>
        user.username === props.username && user.password === props.password
    );

    if (!user) {
      throw new Error('The user does not exist');
    }

    return toDomain(user);
  }

  async registerUser(props: {
    username: string;
    cryptoPassword: string;
  }): Promise<null> {
    const now = new Date().toISOString();
    const newUser: UserAO = {
      id: nanoid(),
      username: props.username,
      password: props.cryptoPassword,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(newUser);

    return null;
  }
}
