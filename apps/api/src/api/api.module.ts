import { Module } from '@nestjs/common';

import { TemplateModule } from '../template/template.module';
import { TemplateController } from './template.controller';
import { ThreadController } from './thread.controller';
import { MessageController } from './message.controller';
import { ThreadModule } from '../thread/thread.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TemplateModule, ThreadModule, MessageModule],
  controllers: [TemplateController, ThreadController, MessageController],
  providers: [],
})
export class ApiModule {}
