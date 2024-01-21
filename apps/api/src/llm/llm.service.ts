import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../open-ai/open-ai.service';
import { AzureOpenAiService } from '../azure-open-ai/azure-open-ai.service';

@Injectable()
export class LlmService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly azureOpenAiService: AzureOpenAiService
  ) {}

  async run(prompt: string) {
    return await this.runForAzureOpenAi(prompt);
  }

  private async runForOpenAi(prompt: string) {
    try {
      const sql = await this.openAiService.ask(prompt);
      return sql;
    } catch (error) {
      console.log(error);
      return 'I don not find results, use 1';
    }
  }

  private async runForAzureOpenAi(prompt: string) {
    try {
      const sql = await this.azureOpenAiService.ask(prompt);
      return sql;
    } catch (error) {
      console.log(error);
      return 'I don not find results, use 2';
    }
  }
}
