import { Injectable } from '@nestjs/common';
import { PrismaService } from '@ailake/prisma-client-basic';
import {
  RetrieveRequest,
  RetrieveResponse,
  ListResponse,
  CreateRequest,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
  RemoveRequest,
  RemoveResponse,
} from './query.type';
import { Query, querySchema } from '@ailake/apitype';

@Injectable()
export class QueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const template = await this.prismaService.query.findUniqueOrThrow({
      where: {
        queryId: props.queryId,
      },
      select: {
        queryId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        metadata: true,
      },
    });

    return {
      ...template,
      metadata: template.metadata as Query,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
    };
  }

  async list(): Promise<ListResponse> {
    const queries = await this.prismaService.query.findMany({
      select: {
        queryId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return queries.map((query) => ({
      ...query,
      createdAt: query.createdAt.toISOString(),
      updatedAt: query.updatedAt.toISOString(),
    }));
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const defaultMetadata: Query = {
      inputs: [],
      steps: [],
    };
    const template = await this.prismaService.query.create({
      data: {
        name: props.name,
        metadata: querySchema.parse(defaultMetadata),
      },
      select: {
        queryId: true,
      },
    });

    return {
      queryId: template.queryId,
    };
  }

  async update(props: UpdateRequest): Promise<UpdateResponse> {
    const template = await this.prismaService.query.update({
      where: {
        queryId: props.queryId,
      },
      data: {
        name: props.name,
        metadata: querySchema.parse(props.metadata),
      },
      select: {
        queryId: true,
      },
    });

    return {
      queryId: template.queryId,
    };
  }

  async remove(props: RemoveRequest): Promise<RemoveResponse> {
    const template = await this.prismaService.query.delete({
      where: {
        queryId: props.queryId,
      },
      select: {
        queryId: true,
      },
    });

    return {
      queryId: template.queryId,
    };
  }
}
