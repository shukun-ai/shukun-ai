import { Module } from '@nestjs/common';
import { DrizzleClientService } from './drizzle-client.service';

@Module({
  controllers: [],
  providers: [DrizzleClientService],
  exports: [DrizzleClientService],
})
export class DrizzleClientModule {}
