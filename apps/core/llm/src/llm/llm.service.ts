import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../open-ai/open-ai.service';
import { AzureOpenAiService } from '../azure-open-ai/azure-open-ai.service';

@Injectable()
export class LlmService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly azureOpenAiService: AzureOpenAiService
  ) {}

  async askSql(prompt: string) {
    return await this.azureOpenAiService.askSql(prompt);
  }
}
