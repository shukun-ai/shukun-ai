import { Module } from '@nestjs/common';
import { SqlPromptService } from './sql-prompt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SqlPromptService],
  exports: [SqlPromptService],
})
export class SqlPromptModule {}
