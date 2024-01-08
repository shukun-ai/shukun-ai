import { CreateJwtDto, CreateJwtResponse, authPath } from '@ailake/apitype';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller()
export class ApiAuthController {
  private readonly twoWeeks = 1000 * 60 * 60 * 24 * 14;
  private readonly halfDay = 1000 * 60 * 60 * 12;

  constructor(private readonly authService: AuthService) {}

  @Post(authPath.createJwt)
  async createJwt(@Body() dto: CreateJwtDto): Promise<CreateJwtResponse> {
    const token = await this.authService.createJwt({
      ...dto,
      expired: dto.remember ? this.twoWeeks : this.halfDay,
    });
    return token;
  }
}
