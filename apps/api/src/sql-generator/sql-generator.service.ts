import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';
import { getPrompt } from './prompt';

@Injectable()
export class SqlGeneratorService {
  constructor(private readonly llmService: LlmService) {}

  async toSql(promptTask: string) {
    const prompt = getPrompt(promptTask);
    const sql = await this.llmService.askSql(prompt);
    return sql;
  }
}
