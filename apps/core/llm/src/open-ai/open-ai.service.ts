import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { environment } from '@shukun-ai/environment';
import { LlmAdaptor } from '../llm/llm-adaptor';

@Injectable()
export class OpenAiService implements LlmAdaptor {
  async askSql(prompt: string): Promise<string> {
    const baseUrl = environment.LLM_API;
    const apiKey = environment.LLM_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error('LLM_OPEN_AI_KEY is not set');
    }

    const openai = new OpenAI({
      baseURL: baseUrl,
      apiKey,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0,
      stop: '```',
    });

    const sql = chatCompletion.choices[0].message.content;

    if (!sql) {
      return 'I did not find sql.';
    }

    return sql.trim().replace('```', '');
  }
}