import { Injectable } from '@nestjs/common';
import { environment } from '@shukun-ai/environment';
import axios from 'axios';
import { LlmAdaptor } from '../llm/llm-adaptor';

@Injectable()
export class AzureOpenAiService implements LlmAdaptor {
  async askSql(prompt: string): Promise<string> {
    const baseUrl = environment.LLM_API;
    const apiKey = environment.LLM_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error('LLM_API_KEY is not set');
    }

    const response = await axios.post<Response>(
      baseUrl +
        `/deployments/${environment.LLM_MODEL}/chat/completions?api-version=2023-05-15`,
      {
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: '```',
      },
      {
        headers: {
          'Api-Key': apiKey,
        },
      }
    );

    const sql = response.data.choices[0].message.content;

    if (!sql) {
      return 'I did not find sql.';
    }

    return sql.trim().replace('```', '');
  }
}

type Response = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    finish_reason: string;
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
