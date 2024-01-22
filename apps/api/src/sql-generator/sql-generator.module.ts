import { Module } from '@nestjs/common';
import { SqlGeneratorService } from './sql-generator.service';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [LlmModule],
  controllers: [],
  providers: [SqlGeneratorService],
  exports: [SqlGeneratorService],
})
export class SqlGeneratorModule {}
