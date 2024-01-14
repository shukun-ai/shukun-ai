import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { environment } from '../environment';

@Injectable()
export class LlmService {
  async run(prompt: string) {
    if (environment.LLM_API_TYPE === 'vllm') {
      return await this.runForVllm(prompt);
    } else {
      return await this.runForHuggingface(prompt);
    }
  }

  private async runForVllm(prompt: string) {
    try {
      const response = await axios.post<{ choices: { text: string }[] }>(
        environment.LLM_API,
        {
          model: 'sql',
          prompt,
          max_tokens: 300,
          temperature: 0,
        }
      );
      const sql = response.data.choices[0].text.trim().replace('```', '');
      return sql;
    } catch {
      return 'I don not find results.';
    }
  }

  private async runForHuggingface(prompt: string) {
    try {
      const response = await axios.post<string>(environment.LLM_API, {
        model: 'sql',
        prompt,
        max_tokens: 300,
        temperature: 0,
      });
      return response.data;
    } catch {
      return 'I don not find results.';
    }
  }
}
