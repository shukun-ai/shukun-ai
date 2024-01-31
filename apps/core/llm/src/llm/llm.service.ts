import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../open-ai/open-ai.service';
import { AzureOpenAiService } from '../azure-open-ai/azure-open-ai.service';
import { environment } from '@shukun-ai/environment';

@Injectable()
export class LlmService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly azureOpenAiService: AzureOpenAiService
  ) {}

  async askSql(prompt: string) {
    if (environment.LLM_TYPE === 'AzureOpenAI') {
      return await this.azureOpenAiService.askSql(prompt);
    } else {
      return await this.openAiService.askSql(prompt);
    }
  }
}
