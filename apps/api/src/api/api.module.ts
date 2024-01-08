import { Module } from '@nestjs/common';

import { ApiAuthController } from './api-auth.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ApiAuthController],
  providers: [],
})
export class ApiModule {}
