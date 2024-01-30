import { Module } from '@nestjs/common';

import { DbQueryModule } from '../db-query/db-query.module';
import { SchemaController } from './schema.controller';
import { SchemaModule } from '../schema/schema.module';
import { QueryModule } from '../query/query.module';
import { QueryController } from './query.controller';
import { QueryGeneratorController } from './query-generator.controller';
import { LlmModule } from '@shukun-ai/llm';
import { SqlPromptModule } from '@shukun-ai/prompt';

@Module({
  imports: [
    DbQueryModule,
    SchemaModule,
    QueryModule,
    SqlPromptModule,
    LlmModule,
  ],
  controllers: [SchemaController, QueryController, QueryGeneratorController],
})
export class ApiModule {}
