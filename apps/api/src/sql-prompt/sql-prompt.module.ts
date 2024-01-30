import { Module } from '@nestjs/common';
import { PrismaClientBasicModule } from '@shukun-ai/prisma-client-basic';
import { SqlPromptService } from './sql-prompt.service';

@Module({
  imports: [PrismaClientBasicModule],
  controllers: [],
  providers: [SqlPromptService],
  exports: [SqlPromptService],
})
export class SqlPromptModule {}
