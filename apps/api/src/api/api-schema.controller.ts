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
} from '@ailake/apitype';
import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import { SchemaService } from '../schema/schema.service';

@Controller()
export class ApiSchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Post(schemaPath.createSchema)
  async createSchema(
    @Body() dto: CreateSchemaDto
  ): Promise<CreateSchemaResponse> {
    return await this.schemaService.createSchema(dto);
  }

  @Put(schemaPath.modifySchema)
  async modifySchema(
    @Body() dto: ModifySchemaDto
  ): Promise<ModifySchemaResponse> {
    return await this.schemaService.modifySchema(dto);
  }

  @Delete(schemaPath.removeSchema)
  async removeSchema(
    @Body() dto: RemoveSchemaDto
  ): Promise<RemoveSchemaResponse> {
    return await this.schemaService.removeSchema(dto);
  }

  @Get(schemaPath.findSchema)
  async findSchema(@Body() dto: FindSchemaDto): Promise<FindSchemaResponse> {
    return await this.schemaService.findSchema(dto);
  }
}
