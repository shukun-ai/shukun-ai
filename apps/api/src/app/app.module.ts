import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresService } from './postgres.service';
import { LlmService } from './llm.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PostgresService, LlmService],
})
export class AppModule {}
