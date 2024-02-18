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
import { DrizzleClientService, schemas } from 'drizzle-client';
import { eq } from 'drizzle-orm';

@Injectable()
export class SchemaService {
  constructor(private readonly drizzleClientService: DrizzleClientService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const row = await this.drizzleClientService.db.query.schemas.findFirst({
      where: eq(schemas.schemaId, props.schemaId),
      columns: {
        schemaId: true,
        name: true,
        connection: true,
        tables: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!row) {
      throw new Error('Did not find schema');
    }

    return {
      ...row,
      connection: row.connection as Schema['connection'],
      tables: row.tables as SchemaTable[],
    };
  }

  async list(): Promise<ListResponse> {
    const rows = await this.drizzleClientService.db.query.schemas.findMany({
      columns: {
        schemaId: true,
        name: true,
        connection: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return rows.map((row) => ({
      ...row,
      connection: row.connection as Schema['connection'],
    }));
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const rows = await this.drizzleClientService.db
      .insert(schemas)
      .values({
        ...props,
        tables: z.array(schemaTableSchema).parse(props.tables),
        updatedAt: new Date().toISOString(),
      })
      .returning({ schemaId: schemas.schemaId });

    return {
      schemaId: rows[0].schemaId,
    };
  }

  async update(props: UpdateRequest): Promise<UpdateResponse> {
    const rows = await this.drizzleClientService.db
      .update(schemas)
      .set({
        name: props.name,
        connection: props.connection
          ? schemaConnectionSchema.parse(props.connection)
          : undefined,
        tables: props.tables
          ? z.array(schemaTableSchema).parse(props.tables)
          : undefined,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schemas.schemaId, props.schemaId))
      .returning({ schemaId: schemas.schemaId });

    return {
      schemaId: rows[0].schemaId,
    };
  }

  async remove(props: RemoveRequest): Promise<RemoveResponse> {
    const rows = await this.drizzleClientService.db
      .delete(schemas)
      .where(eq(schemas.schemaId, props.schemaId))
      .returning({ schemaId: schemas.schemaId });

    return {
      schemaId: rows[0].schemaId,
    };
  }
}
