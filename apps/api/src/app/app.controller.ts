import { Body, Controller, Post } from '@nestjs/common';
import { nanoid } from 'nanoid';
import {
  CreateConversationDto,
  Conversation,
  Comment,
  DataResult,
  CreateConversationResponse,
  conversationPath,
} from '@ailake/apitype';
import { PostgresService } from './postgres.service';
import { getPrompt } from './prompt';
import { environment } from '../environment';
import { getAllSchema, getPartialSchema } from './schema';
import { EmbeddingService } from './embedding.service';
import { getEmbeddingQuery } from './get-embedding-query';
import { LlmService } from '../llm/llm.service';

@Controller()
export class AppController {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly llmService: LlmService,
    private readonly embeddingService: EmbeddingService
  ) {}

  @Post(conversationPath.createConversation)
  async createConversation(
    @Body() dto: CreateConversationDto
  ): Promise<CreateConversationResponse> {
    const userId = '1';

    const conversation: Conversation = {
      id: dto.conversationId,
      createdAt: new Date().toISOString(),
    };

    const askComment: Comment = {
      id: dto.askCommentId,
      conversationId: conversation.id,
      belongUserId: userId,
      sentByRobot: false,
      commentType: 'text',
      commentText: dto.ask,
      commentSQL: null,
      createdAt: new Date().toISOString(),
    };

    const sql = await this.getSql(dto.ask);

    const replyCommentId = nanoid();

    const replyComment: Comment = {
      id: replyCommentId,
      conversationId: conversation.id,
      belongUserId: 'robot',
      sentByRobot: true,
      commentType: 'data',
      commentText: null,
      commentSQL: sql,
      createdAt: new Date().toISOString(),
    };

    if (!replyComment.commentSQL) {
      throw new Error('replyComment.commentSQL is not created');
    }

    const result = await this.postgresService.run(replyComment.commentSQL);

    const dataResult: DataResult = {
      id: nanoid(),
      commentId: replyCommentId,
      belongUserId: 'robot',
      sql: replyComment.commentSQL,
      data: result,
      createdAt: new Date().toISOString(),
    };

    return {
      conversation,
      askComment,
      replyComment,
      dataResult,
    };
  }

  private async getSql(ask: string) {
    const schema = await this.getSchema(ask);
    const prompt = getPrompt(ask, schema);

    if (environment.LLM_API) {
      const sql = await this.llmService.run(prompt);
      return sql;
    } else {
      return `SELECT table_arrival_tasks.id, table_arrival_tasks.flight_number, table_arrival_tasks.airport_code, table_arrival_tasks.actual_at, table_arrival_tasks.created_at, table_arrival_tasks.estimated_at, table_arrival_tasks.source_departure_at, table_arrival_tasks.status FROM table_arrival_tasks WHERE table_arrival_tasks.status ='synced' AND table_arrival_tasks.source_departure_at IS NOT NULL AND table_arrival_tasks.estimated_at IS NULL ORDER BY table_arrival_tasks.created_at DESC LIMIT 10;`;
    }
  }

  private async getSchema(ask: string) {
    if (environment.EMBEDDING_API) {
      const schema = getAllSchema();
      const embeddingQuery = getEmbeddingQuery(schema);
      const results = await this.embeddingService.query({
        ask,
        embeddingQuery,
      });
      const partialSchema = getPartialSchema(results);
      return partialSchema;
    } else {
      const schema = getAllSchema();
      return schema;
    }
  }
}
