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
} from './thread.type';

@Injectable()
export class ThreadService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const thread = await this.prismaService.thread.findUniqueOrThrow({
      where: {
        threadId: props.threadId,
      },
      select: {
        threadId: true,
        title: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...thread,
      createdAt: thread.createdAt.toISOString(),
      updatedAt: thread.updatedAt.toISOString(),
    };
  }

  async list(): Promise<ListResponse> {
    const threads = await this.prismaService.thread.findMany({
      select: {
        threadId: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return threads.map((thread) => ({
      ...thread,
      createdAt: thread.createdAt.toISOString(),
      updatedAt: thread.updatedAt.toISOString(),
    }));
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const thread = await this.prismaService.thread.create({
      data: {
        title: props.title,
        userId: props.userId,
        templateId: props.templateId,
      },
      select: {
        threadId: true,
      },
    });

    return {
      threadId: thread.threadId,
    };
  }

  async update(props: UpdateRequest): Promise<UpdateResponse> {
    const thread = await this.prismaService.thread.update({
      where: {
        threadId: props.threadId,
      },
      data: {
        title: props.title,
      },
      select: {
        threadId: true,
      },
    });

    return {
      threadId: thread.threadId,
    };
  }
}
