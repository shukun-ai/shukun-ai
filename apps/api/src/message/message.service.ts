import { Injectable } from '@nestjs/common';
import { PrismaService } from '@ailake/prisma-client-basic';
import {
  CreateRequest,
  CreateResponse,
  ListResponse,
  RetrieveRequest,
  RetrieveResponse,
  UpdateRequest,
  UpdateResponse,
} from './message.type';
import { ThreadMessage } from '@ailake/apitype';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const message = await this.prismaService.message.findUniqueOrThrow({
      where: {
        messageId: props.messageId,
      },
    });

    return {
      ...message,
      role: message.role as ThreadMessage['role'],
      metadata: message.metadata as ThreadMessage['metadata'],
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    };
  }

  async list(): Promise<ListResponse> {
    const messages = await this.prismaService.message.findMany();

    return messages.map((message) => ({
      ...message,
      role: message.role as ThreadMessage['role'],
      metadata: message.metadata as ThreadMessage['metadata'],
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    }));
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const message = await this.prismaService.message.create({
      data: {
        role: props.role,
        // TODO add json schema validate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: props.metadata as any,
        threadId: props.threadId,
      },
    });

    return {
      messageId: message.messageId,
    };
  }

  async update(props: UpdateRequest): Promise<UpdateResponse> {
    const message = await this.prismaService.message.update({
      where: {
        messageId: props.messageId,
      },
      data: {
        // TODO add json schema validate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: props.metadata as any,
      },
    });

    return {
      messageId: message.messageId,
    };
  }
}
