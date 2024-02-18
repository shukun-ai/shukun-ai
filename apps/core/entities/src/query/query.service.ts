import { Injectable } from '@nestjs/common';
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
import { Query, querySchema } from '@shukun-ai/apitype';
import { DrizzleClientService, queries } from 'drizzle-client';
import { eq } from 'drizzle-orm';

@Injectable()
export class QueryService {
  constructor(private readonly drizzleClientService: DrizzleClientService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const row = await this.drizzleClientService.db.query.queries.findFirst({
      where: eq(queries.queryId, props.queryId),
    });

    if (!row) {
      throw new Error('Did not find query');
    }

    return {
      ...row,
      metadata: row.metadata as Query,
    };
  }

  async list(): Promise<ListResponse> {
    const rows = await this.drizzleClientService.db.query.queries.findMany({
      columns: {
        queryId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return rows;
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const defaultMetadata: Query = {
      inputs: [],
      steps: [],
    };
    const rows = await this.drizzleClientService.db
      .insert(queries)
      .values({
        name: props.name,
        metadata: querySchema.parse(defaultMetadata),
        updatedAt: new Date().toISOString(),
      })
      .returning({ queryId: queries.queryId });

    return {
      queryId: rows[0].queryId,
    };
  }

  async update(props: UpdateRequest): Promise<UpdateResponse> {
    const rows = await this.drizzleClientService.db
      .update(queries)
      .set({
        name: props.name,
        metadata: props.metadata
          ? querySchema.parse(props.metadata)
          : undefined,
      })
      .where(eq(queries.queryId, props.queryId))
      .returning({ queryId: queries.queryId });

    return {
      queryId: rows[0].queryId,
    };
  }

  async remove(props: RemoveRequest): Promise<RemoveResponse> {
    const rows = await this.drizzleClientService.db
      .delete(queries)
      .where(eq(queries.queryId, props.queryId))
      .returning({ queryId: queries.queryId });

    return {
      queryId: rows[0].queryId,
    };
  }
}
