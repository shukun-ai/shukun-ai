import { Module } from '@nestjs/common';
import { PrismaClientBasicModule } from '@ailake/prisma-client-basic';
import { QueryService } from './query.service';

@Module({
  imports: [PrismaClientBasicModule],
  controllers: [],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule {}
