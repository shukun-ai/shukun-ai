import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    authService = new AuthService(userService);

    jest.spyOn(userService, 'verifyUser').mockImplementation(async () => {
      return {
        id: 'test',
        username: 'test',
      };
    });
  });

  describe('createJwt', () => {
    it('should create a JWT token', async () => {
      // Arrange
      const props = {
        username: 'test',
        password: 'test',
        expired: 3600,
      };

      // Act
      const result = await authService.createJwt(props);

      // Assert
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('username', props.username);
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('expiredAt');
    });
  });

  describe('verifyJwt', () => {
    it.skip('should verify a valid JWT token', async () => {
      // Arrange
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJ1c2VySWQiOiJiUXVvREIteXg1Rzdlcmh2Y0ZwdmIiLCJleHBpcmVkIjoxNzA0NzAxNDQxOTM5LCJpYXQiOjE3MDQ3MDE0Mzh9.QilBJUj5AiTFcBqdMIyo0_Sk22UEs4voLsAZjpWiFUY';

      // Act
      const result = await authService.verifyJwt(token);

      // Assert
      expect(result).toHaveProperty('username');
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('expired');
    });

    it('should throw an error for an invalid JWT token', async () => {
      // Arrange
      const token = 'invalid_token';

      // Act and Assert
      await expect(authService.verifyJwt(token)).rejects.toThrow(
        new Error('JWT is invalid')
      );
    });
  });
});
