import { PrismaService, Prisma } from '@shukun-ai/prisma-client-basic';
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
import {
  Schema,
  SchemaTable,
  schemaConnectionSchema,
  schemaTableSchema,
} from '@shukun-ai/apitype';
import { z } from 'zod';

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
        connection: true,
        tables: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...schema,
      connection: schema.connection as Schema['connection'],
      tables: schema.tables as SchemaTable[],
      createdAt: schema.createdAt.toISOString(),
      updatedAt: schema.updatedAt.toISOString(),
    };
  }

  async list(): Promise<ListResponse> {
    const schemas = await this.prismaService.schema.findMany({
      select: {
        schemaId: true,
        name: true,
        connection: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return schemas.map((schema) => ({
      ...schema,
      connection: schema.connection as Schema['connection'],
      createdAt: schema.createdAt.toISOString(),
      updatedAt: schema.updatedAt.toISOString(),
    }));
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const schema = await this.prismaService.schema.create({
      data: {
        ...props,
        tables: z
          .array(schemaTableSchema)
          .parse(props.tables) as Prisma.InputJsonValue,
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
        connection: props.connection
          ? (schemaConnectionSchema.parse(
              props.connection
            ) as Prisma.InputJsonValue)
          : undefined,
        tables: props.tables
          ? (z
              .array(schemaTableSchema)
              .parse(props.tables) as Prisma.InputJsonValue)
          : undefined,
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
