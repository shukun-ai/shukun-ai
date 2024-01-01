import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { environment } from '../environment';

@Injectable()
export class LlmService {
  async run(prompt: string) {
    const response = await axios.post<string>(environment.LLM_API, {
      prompt,
    });
    return response.data;
  }
}
