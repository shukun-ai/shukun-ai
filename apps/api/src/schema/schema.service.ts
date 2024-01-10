import {
  CreateSchemaDto,
  CreateSchemaResponse,
  FindSchemaDto,
  FindSchemaResponse,
  ModifySchemaDto,
  ModifySchemaResponse,
  RemoveSchemaDto,
  RemoveSchemaResponse,
} from '@ailake/apitype';
import { Injectable } from '@nestjs/common';
import { SchemaModel } from './schema.model';

@Injectable()
export class SchemaService {
  constructor() {}

  async createSchema(dto: CreateSchemaDto): Promise<CreateSchemaResponse> {
    await SchemaModel.create({ ...dto, tables: {} });
    return null;
  }

  async modifySchema(dto: ModifySchemaDto): Promise<ModifySchemaResponse> {
    await SchemaModel.update(dto, { where: { name: dto.name } });
    return null;
  }

  async removeSchema(dto: RemoveSchemaDto): Promise<RemoveSchemaResponse> {
    await SchemaModel.destroy({ where: { name: dto.name } });
    return null;
  }

  async findSchema(dto: FindSchemaDto): Promise<FindSchemaResponse> {
    const schemas = await SchemaModel.findAll({
      where: dto,
      attributes: ['name', 'type', 'url', 'secretKey'],
    });

    return schemas.map((schema) => {
      const json = schema.toJSON();
      return {
        name: json.name,
        type: json.type,
        url: json.url,
        secretKey: json.secretKey,
      };
    });
  }
}
