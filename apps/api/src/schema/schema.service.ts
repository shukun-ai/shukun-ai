import { PrismaService } from '@shukun-ai/prisma-client-basic';
import { Injectable } from '@nestjs/common';
import {
  CreateRequest,
  CreateResponse,
  ListResponse,
  RemoveRequest,
  RemoveResponse,
  RetrieveRequest,
  RetrieveResponse,
  UpdateRequest,
  UpdateResponse,
} from './schema.type';
import { TableDefinition } from '@shukun-ai/apitype';

@Injectable()
export class SchemaService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const schema = await this.prismaService.schema.findUniqueOrThrow({
      where: {
        schemaId: props.schemaId,
      },
      select: {
        schemaId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        dbType: true,
        dbUrl: true,
        tables: true,
      },
    });

    return {
      ...schema,
      tables: schema.tables as TableDefinition[],
      createdAt: schema.createdAt.toISOString(),
      updatedAt: schema.updatedAt.toISOString(),
    };
  }

  async list(): Promise<ListResponse> {
    const schemas = await this.prismaService.schema.findMany({
      select: {
        schemaId: true,
        name: true,
        dbType: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return schemas.map((schema) => ({
      ...schema,
      createdAt: schema.createdAt.toISOString(),
      updatedAt: schema.updatedAt.toISOString(),
    }));
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const schema = await this.prismaService.schema.create({
      data: {
        ...props,
        // TODO add json schema validate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tables: props.tables as any,
      },
      select: {
        schemaId: true,
      },
    });

    return {
      schemaId: schema.schemaId,
    };
  }

  async update(props: UpdateRequest): Promise<UpdateResponse> {
    const schema = await this.prismaService.schema.update({
      where: {
        schemaId: props.schemaId,
      },
      data: {
        name: props.name,
        dbType: props.dbType,
        dbUrl: props.dbUrl,
        // TODO add json schema validate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tables: props.tables as any,
      },
      select: {
        schemaId: true,
      },
    });

    return {
      schemaId: schema.schemaId,
    };
  }

  async remove(props: RemoveRequest): Promise<RemoveResponse> {
    const schema = await this.prismaService.schema.delete({
      where: {
        schemaId: props.schemaId,
      },
      select: {
        schemaId: true,
      },
    });

    return {
      schemaId: schema.schemaId,
    };
  }
}
