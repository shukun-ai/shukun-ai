import {
  CreateSchemaDto,
  CreateSchemaResponse,
  ModifySchemaDto,
  ModifySchemaResponse,
  RemoveSchemaDto,
  RemoveSchemaResponse,
  FindSchemaDto,
  FindSchemaResponse,
  schemaPath,
  PushTablesDto,
  PushTablesResponse,
} from '@ailake/apitype';
import { Controller, Post, Body } from '@nestjs/common';
import { SchemaService } from '../schema/schema.service';
import { TableService } from '../schema/table.service';

@Controller()
export class ApiSchemaController {
  constructor(
    private readonly schemaService: SchemaService,
    private readonly tableService: TableService
  ) {}

  @Post(schemaPath.createSchema)
  async createSchema(
    @Body() dto: CreateSchemaDto
  ): Promise<CreateSchemaResponse> {
    return await this.schemaService.createSchema(dto);
  }

  @Post(schemaPath.modifySchema)
  async modifySchema(
    @Body() dto: ModifySchemaDto
  ): Promise<ModifySchemaResponse> {
    return await this.schemaService.modifySchema(dto);
  }

  @Post(schemaPath.removeSchema)
  async removeSchema(
    @Body() dto: RemoveSchemaDto
  ): Promise<RemoveSchemaResponse> {
    return await this.schemaService.removeSchema(dto);
  }

  @Post(schemaPath.findSchema)
  async findSchema(@Body() dto: FindSchemaDto): Promise<FindSchemaResponse> {
    return await this.schemaService.findSchema(dto);
  }

  @Post(schemaPath.pushTables)
  async pushTables(@Body() dto: PushTablesDto): Promise<PushTablesResponse> {
    return await this.tableService.pushTables(dto);
  }
}
