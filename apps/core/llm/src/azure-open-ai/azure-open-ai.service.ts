import { Injectable } from '@nestjs/common';
import { environment } from '@shukun-ai/environment';
import { LlmAdaptor } from '../llm/llm-adaptor';
import { makeFetch } from '@shukun-ai/utils';

@Injectable()
export class AzureOpenAiService implements LlmAdaptor {
  async askSql(prompt: string): Promise<string> {
    const baseUrl = environment.LLM_API;
    const apiKey = environment.LLM_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error('LLM_API_KEY is not set');
    }

    const url =
      baseUrl +
      `/deployments/${environment.LLM_MODEL}/chat/completions?api-version=2024-02-15-preview`;

    const body = {
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
    };

    const response = await makeFetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const json: Response = await response.json();

    const sql = json.choices[0].message.content;

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
