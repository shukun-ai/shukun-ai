import { Module } from '@nestjs/common';

import { DbQueryModule } from '../db-query/db-query.module';
import { SqlGeneratorModule } from '../sql-generator/sql-generator.module';
import { SchemaController } from './schema.controller';
import { SchemaModule } from '../schema/schema.module';
import { QueryModule } from '../query/query.module';
import { QueryController } from './query.controller';
import { QueryGeneratorController } from './query-generator.controller';
import { LlmModule } from '../llm/llm.module';
import { SqlPromptModule } from '../sql-prompt/sql-prompt.module';

@Module({
  imports: [
    DbQueryModule,
    SqlGeneratorModule,
    SchemaModule,
    QueryModule,
    SqlPromptModule,
    LlmModule,
  ],
  controllers: [SchemaController, QueryController, QueryGeneratorController],
})
export class ApiModule {}
