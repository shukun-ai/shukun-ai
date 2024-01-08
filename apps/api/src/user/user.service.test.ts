import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    userService.onApplicationBootstrap();
  });

  it('should verify a valid user', async () => {
    const user = await userService.verifyUser({
      username: 'superadmin',
      password: 'superadmin',
    });

    expect(user).toBeDefined();
    expect(user.id).toBe('1');
    expect(user.username).toBe('superadmin');
  });

  it('should throw an error for an invalid user', async () => {
    await expect(
      userService.verifyUser({
        username: 'invalid',
        password: 'invalid',
      })
    ).rejects.toThrow('The user does not exist');
  });
});
