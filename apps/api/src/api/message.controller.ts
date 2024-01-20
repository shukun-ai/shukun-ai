import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import {
  apiPath,
  MessageCreateInput,
  MessageCreateOutput,
} from '@ailake/apitype';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(apiPath.message.create)
  async create(
    @Body() props: MessageCreateInput
  ): Promise<MessageCreateOutput> {
    const { messageId } = await this.messageService.create({
      role: props.role,
      threadId: props.threadId,
      metadata: props.metadata,
    });

    const message = await this.messageService.retrieve({
      messageId,
    });

    return {
      ...message,
    };
  }
}
