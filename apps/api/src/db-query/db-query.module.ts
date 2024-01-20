import { Module } from '@nestjs/common';

import { PostgresService } from './postgres.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class DbQueryModule {}
