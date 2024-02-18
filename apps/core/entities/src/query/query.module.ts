import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { DrizzleClientModule } from 'drizzle-client';

@Module({
  imports: [DrizzleClientModule],
  controllers: [],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule {}
