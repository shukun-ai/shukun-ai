import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresService } from './postgres.service';
import { LlmService } from './llm.service';
import { ApiModule } from '../api/api.module';
import { TestLlmController } from './test-llm.controller';
import { EmbeddingService } from './embedding.service';
import { OpenAiModule } from '../open-ai/open-ai.module';

@Module({
  imports: [ApiModule, OpenAiModule],
  controllers: [AppController, TestLlmController],
  providers: [AppService, PostgresService, LlmService, EmbeddingService],
})
export class AppModule {}
