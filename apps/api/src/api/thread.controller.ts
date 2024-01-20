import { Body, Controller, Post } from '@nestjs/common';
import { ThreadService } from '../thread/thread.service';
import {
  apiPath,
  ThreadCreateInput,
  ThreadCreateOutput,
  ThreadRetrieveInput,
  ThreadRetrieveOutput,
} from '@ailake/apitype';
import { TemplateService } from '../template/template.service';
import { MessageService } from '../message/message.service';
import { ThreadTemplateService } from './thread-template.service';

@Controller()
export class ThreadController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly threadService: ThreadService,
    private readonly messageService: MessageService,
    private readonly threadTemplateService: ThreadTemplateService
  ) {}

  @Post(apiPath.threads.retrieve)
  async retrieve(
    @Body() props: ThreadRetrieveInput
  ): Promise<ThreadRetrieveOutput> {
    const thread = await this.threadService.retrieve(props);
    const messages = await this.messageService.list({
      threadId: thread.threadId,
    });

    return {
      ...thread,
      messages,
    };
  }

  @Post(apiPath.threads.create)
  async create(@Body() props: ThreadCreateInput): Promise<ThreadCreateOutput> {
    const template = await this.templateService.retrieve({
      templateId: props.templateId,
    });

    const { threadId } = await this.threadService.create({
      title: template.name,
      userId: 'user1',
      templateId: props.templateId,
    });

    const thread = await this.threadService.retrieve({ threadId });

    const message = await this.messageService.create({
      role: 'user',
      threadId: thread.threadId,
      metadata: {
        type: 'userTemplate',
        text: template.name,
      },
    });

    const userMessage = await this.messageService.retrieve({
      messageId: message.messageId,
    });

    const nextMessage = await this.threadTemplateService.createNextMessage({
      messages: [userMessage],
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
      ...thread,
      messages: [userMessage, assistantMessage],
    };
  }
}
