import { Controller, Post } from '@nestjs/common';

import { PostgresService } from './postgres.service';
import { getPrompt } from './prompt';
import { getSchemaDefinition } from './schema';
import { LlmService } from '../llm/llm.service';

@Controller()
export class TestLlmController {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly llmService: LlmService
  ) {}

  @Post('test-llm')
  async createConversation(): Promise<
    { ask: string; sql: string; spend: number; result: unknown }[]
  > {
    const sets: { ask: string; sql: string; spend: number; result: unknown }[] =
      [];
    for (const askTemplate of askTemplates) {
      const start = new Date();
      const ask = askTemplate.question;
      const sql = await this.askQuestion(ask);
      const spend = (new Date().getTime() - start.getTime()) / 1000;
      console.log(sql);
      const result = await this.postgresService.run(sql);

      sets.push({ ask, sql, spend, result: result.rows.length });
    }
    return sets;
  }

  private async askQuestion(ask: string): Promise<string> {
    const sql = await this.getSql(ask);
    return sql;
  }

  private async getSql(ask: string) {
    const prompt = getPrompt(ask, getSchemaDefinition());
    const sql = await this.llmService.run(prompt);
    return sql;
  }
}

type AskTemplate = {
  question: string;
};

const askTemplates: AskTemplate[] = [
  {
    question: '前十条任务的机场代码分布是什么？',
  },
  {
    question: '最近一个月被任务绑定次数最多的车辆？',
  },
  {
    question:
      '有前站起飞时间但没有预到时间的任务按航司进行分组，航司是航班号的前两位',
  },
  {
    question:
      '列出最新十条任务按航班日期由近到远排序，必须有前站起飞时间但没有预到时间，且任务状态为已同步，列出所有任务字段',
  },
  {
    question: '2023年10月的所有任务按航司进行分组，航司是航班号的前两位',
  },
];
