import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresService } from './postgres.service';
import { LlmService } from './llm.service';
import { ApiModule } from '../api/api.module';
import { TestLlmController } from './test-llm.controller';

@Module({
  imports: [ApiModule],
  controllers: [AppController, TestLlmController],
  providers: [AppService, PostgresService, LlmService],
})
export class AppModule {}
