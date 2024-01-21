import { Injectable } from '@nestjs/common';
import { environment } from '../environment';
import axios from 'axios';

@Injectable()
export class AzureOpenAiService {
  async ask(prompt: string): Promise<string> {
    const baseUrl = environment.LLM_API;
    const apiKey = environment.LLM_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error('LLM_OPEN_AI_KEY is not set');
    }

    const response = await axios.post<Response>(
      baseUrl + '/deployments/gpt35/chat/completions?api-version=2023-05-15',
      {
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
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
