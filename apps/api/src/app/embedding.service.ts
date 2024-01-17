import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Metadata } from './get-embedding-query';
import { environment } from '../environment';

@Injectable()
export class EmbeddingService {
  async query(props: {
    ask: string;
    embeddingQuery: {
      documents: string[];
      metadatas: Metadata[];
      ids: string[];
    };
  }): Promise<{
    ids: string[][];
    metadatas: Metadata[][];
  }> {
    const { ask, embeddingQuery } = props;
    const response = await axios.post<{
      ids: string[][];
      metadatas: Metadata[][];
    }>(environment.EMBEDDING_API, {
      questions: [ask],
      where: {},
      results: [20],
      documents: embeddingQuery.documents,
      metadatas: embeddingQuery.metadatas,
      ids: embeddingQuery.ids,
    });
    return response.data;
  }
}
