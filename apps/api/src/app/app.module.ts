import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresService } from './postgres.service';
import { ApiModule } from '../api/api.module';
import { TestLlmController } from './test-llm.controller';
import { EmbeddingService } from './embedding.service';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [ApiModule, LlmModule],
  controllers: [AppController, TestLlmController],
  providers: [AppService, PostgresService, EmbeddingService],
})
export class AppModule {}
