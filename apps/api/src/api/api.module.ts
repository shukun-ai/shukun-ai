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

@Module({
  imports: [
    TemplateModule,
    ThreadModule,
    MessageModule,
    DbQueryModule,
    SqlGeneratorModule,
    SchemaModule,
  ],
  controllers: [
    TemplateController,
    ThreadController,
    MessageController,
    SchemaController,
  ],
  providers: [ThreadTemplateService],
})
export class ApiModule {}
