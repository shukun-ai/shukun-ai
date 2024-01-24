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

@Module({
  imports: [
    TemplateModule,
    ThreadModule,
    MessageModule,
    DbQueryModule,
    SqlGeneratorModule,
    SchemaModule,
    QueryModule,
  ],
  controllers: [
    TemplateController,
    ThreadController,
    MessageController,
    SchemaController,
    QueryController,
  ],
  providers: [ThreadTemplateService],
})
export class ApiModule {}
