import { Module } from '@nestjs/common';
import { PrismaClientBasicModule } from '@ailake/prisma-client-basic';
import { SqlPromptService } from './sql-prompt.service';

@Module({
  imports: [PrismaClientBasicModule],
  controllers: [],
  providers: [SqlPromptService],
  exports: [SqlPromptService],
})
export class SqlPromptModule {}
