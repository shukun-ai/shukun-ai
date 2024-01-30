import { Module } from '@nestjs/common';
import { AzureOpenAiService } from './azure-open-ai.service';

@Module({
  providers: [AzureOpenAiService],
  exports: [AzureOpenAiService],
})
export class AzureOpenAiModule {}
