import {
  SchemaCreateInput,
  SchemaCreateOutput,
  SchemaListOutput,
  SchemaRemoveInput,
  SchemaRemoveOutput,
  SchemaRetrieveInput,
  SchemaRetrieveOutput,
  SchemaSyncInput,
  SchemaSyncOutput,
  SchemaTable,
  SchemaUpdateInput,
  SchemaUpdateOutput,
  apiPath,
} from '@shukun-ai/apitype';
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SchemaService } from '@shukun-ai/entities';
import { PostgresService } from '@shukun-ai/db';

@Controller()
export class SchemaController {
  constructor(
    private readonly schemaService: SchemaService,
    private readonly postgresService: PostgresService
  ) {}

  @Post(apiPath.schema.retrieve)
  async retrieve(
    @Body() props: SchemaRetrieveInput
  ): Promise<SchemaRetrieveOutput> {
    return await this.schemaService.retrieve(props);
  }

  @Post(apiPath.schema.list)
  async list(): Promise<SchemaListOutput> {
    return await this.schemaService.list();
  }

  @Post(apiPath.schema.create)
  async create(@Body() props: SchemaCreateInput): Promise<SchemaCreateOutput> {
    return await this.schemaService.create({ ...props, tables: [] });
  }

  @Post(apiPath.schema.update)
  async update(@Body() props: SchemaUpdateInput): Promise<SchemaUpdateOutput> {
    return await this.schemaService.update(props);
  }

  @Post(apiPath.schema.remove)
  async remove(@Body() props: SchemaRemoveInput): Promise<SchemaRemoveOutput> {
    return await this.schemaService.remove(props);
  }

  @Post(apiPath.schema.sync)
  async sync(@Body() props: SchemaSyncInput): Promise<SchemaSyncOutput> {
    const { name, connection } = await this.schemaService.retrieve(props);
    let tables: SchemaTable[];
    try {
      tables = await this.postgresService.generateSchema(connection);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `We could not connect with ${name} database.`
      );
    }
    await this.schemaService.update({ schemaId: props.schemaId, tables });
    return {
      schemaId: props.schemaId,
    };
  }
}
