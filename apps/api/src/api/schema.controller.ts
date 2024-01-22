import {
  SchemaCreateInput,
  SchemaCreateOutput,
  SchemaListOutput,
  SchemaRemoveInput,
  SchemaRemoveOutput,
  SchemaRetrieveInput,
  SchemaRetrieveOutput,
  SchemaUpdateInput,
  SchemaUpdateOutput,
  apiPath,
} from '@ailake/apitype';
import { Controller, Post, Body } from '@nestjs/common';
import { SchemaService } from '../schema/schema.service';

@Controller()
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

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
}
