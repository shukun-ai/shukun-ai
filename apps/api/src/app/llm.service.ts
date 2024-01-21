import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../open-ai/open-ai.service';

@Injectable()
export class LlmService {
  constructor(private readonly openAiService: OpenAiService) {}

  async run(prompt: string) {
    return await this.runForOpenAi(prompt);
  }

  private async runForOpenAi(prompt: string) {
    try {
      const sql = await this.openAiService.ask(prompt);
      return sql;
    } catch {
      return 'I don not find results ai, I am app llm.service.';
    }
  }
}
