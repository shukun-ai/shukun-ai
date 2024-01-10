import { Module } from '@nestjs/common';

import { ApiAuthController } from './api-auth.controller';
import { AuthModule } from '../auth/auth.module';
import { SchemaModule } from '../schema/schema.module';
import { ApiSchemaController } from './api-schema.controller';

@Module({
  imports: [AuthModule, SchemaModule],
  controllers: [ApiAuthController, ApiSchemaController],
  providers: [],
})
export class ApiModule {}
