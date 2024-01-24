import { Module } from '@nestjs/common';

import { TemplateModule } from '../template/template.module';
import { TemplateController } from './template.controller';
import { ThreadController } from './thread.controller';
import { MessageController } from './message.controller';
import { ThreadModule } from '../thread/thread.module';
import { MessageModule } from '../message/message.module';
import { ThreadTemplateService } from './thread-template.service';
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
    TemplateModule,
    ThreadModule,
    MessageModule,
    DbQueryModule,
    SqlGeneratorModule,
    SchemaModule,
    QueryModule,
    SqlPromptModule,
    LlmModule,
  ],
  controllers: [
    TemplateController,
    ThreadController,
    MessageController,
    SchemaController,
    QueryController,
    QueryGeneratorController,
  ],
  providers: [ThreadTemplateService],
})
export class ApiModule {}
