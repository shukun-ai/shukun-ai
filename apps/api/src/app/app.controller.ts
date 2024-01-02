import { Body, Controller, Post } from '@nestjs/common';
import { nanoid } from 'nanoid';
import {
  CreateConversationDto,
  Conversation,
  Comment,
  DataResult,
  CreateConversationResponse,
} from '@ailake/apitype';
import { PostgresService } from './postgres.service';
import { LlmService } from './llm.service';
import { getPrompt } from './prompt';
import { environment } from '../environment';

@Controller()
export class AppController {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly llmService: LlmService
  ) {}

  @Post('create-conversation')
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
    const prompt = getPrompt(ask);

    if (environment.LLM_ENABLE) {
      const sql = await this.llmService.run(prompt);
      return sql;
    } else {
      // return 'SELECT arrivaltasks.airportcode, COUNT(arrivaltasks.id) AS total_tasks FROM arrivaltasks GROUP BY arrivaltasks.airportcode ORDER BY total_tasks DESC NULLS LAST;';
      return `SELECT a.airportCode, COUNT(*) AS COUNT FROM arrivalTasks a JOIN arrivalPackages p ON a.id = p.arrivalTaskId WHERE a.status IN ('finished','synced') GROUP BY a.airportCode ORDER BY COUNT DESC NULLS LAST LIMIT 10;`;
    }
  }
}
