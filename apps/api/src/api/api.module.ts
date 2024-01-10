import { Module } from '@nestjs/common';

import { ApiAuthController } from './api-auth.controller';
import { AuthModule } from '../auth/auth.module';
import { SchemaModule } from '../schema/schema.module';

@Module({
  imports: [AuthModule, SchemaModule],
  controllers: [ApiAuthController],
  providers: [],
})
export class ApiModule {}
