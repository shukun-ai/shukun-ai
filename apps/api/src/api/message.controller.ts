import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import {
  apiPath,
  MessageCreateInput,
  MessageCreateOutput,
} from '@ailake/apitype';
import { ThreadTemplateService } from './thread-template.service';
import { TemplateService } from '../template/template.service';
import { ThreadService } from '../thread/thread.service';

@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly templateService: TemplateService,
    private readonly threadService: ThreadService,
    private readonly threadTemplateService: ThreadTemplateService
  ) {}

  @Post(apiPath.messages.create)
  async create(
    @Body() props: MessageCreateInput
  ): Promise<MessageCreateOutput> {
    await this.messageService.create({
      role: props.role,
      threadId: props.threadId,
      metadata: props.metadata,
    });

    const thread = await this.threadService.retrieve({
      threadId: props.threadId,
    });

    const template = await this.templateService.retrieve({
      templateId: thread.templateId,
    });

    const messages = await this.messageService.list({
      threadId: props.threadId,
    });

    const nextMessage = await this.threadTemplateService.createNextMessage({
      messages: messages,
      template,
    });

    const { messageId: nextMessageId } = await this.messageService.create({
      role: nextMessage.role,
      threadId: thread.threadId,
      metadata: nextMessage.metadata,
    });

    const assistantMessage = await this.messageService.retrieve({
      messageId: nextMessageId,
    });

    return {
      userMessage: messages[messages.length - 1],
      assistantMessage,
    };
  }
}
