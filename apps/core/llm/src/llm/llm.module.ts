import { Module } from '@nestjs/common';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { LlmService } from './llm.service';
import { AzureOpenAiModule } from '../azure-open-ai/azure-open-ai.module';

@Module({
  imports: [OpenAiModule, AzureOpenAiModule],
  controllers: [],
  providers: [LlmService],
  exports: [LlmService],
})
export class LlmModule {}
