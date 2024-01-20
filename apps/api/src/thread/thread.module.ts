import { Module } from '@nestjs/common';
import { PrismaClientBasicModule } from '@ailake/prisma-client-basic';
import { ThreadService } from './thread.service';

@Module({
  imports: [PrismaClientBasicModule],
  controllers: [],
  providers: [ThreadService],
  exports: [ThreadService],
})
export class ThreadModule {}
