import { Body, Controller, Post } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { AppService } from './app.service';
import {
  CreateConversationDto,
  Conversation,
  Comment,
  DataResult,
  CreateConversationResponse,
} from '@ailake/apitype';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

    await sleep(3000);

    const replyCommentId = nanoid();

    const replyComment: Comment = {
      id: replyCommentId,
      conversationId: conversation.id,
      belongUserId: 'robot',
      sentByRobot: true,
      commentType: 'data',
      commentText: null,
      commentSQL: 'SELECT * FROM users WHERE id = 1',
      createdAt: new Date().toISOString(),
    };

    const dataResult: DataResult = {
      id: nanoid(),
      commentId: replyCommentId,
      belongUserId: 'robot',
      sql: 'SELECT * FROM users WHERE id = 1',
      data: {
        id: 1,
        name: 'John',
        age: 20,
      },
      createdAt: new Date().toISOString(),
    };

    return {
      conversation,
      askComment,
      replyComment,
      dataResult,
    };
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
