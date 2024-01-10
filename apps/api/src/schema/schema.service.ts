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
    const schema = await SchemaModel.create({ ...dto, tables: {} });
    return { id: schema.getDataValue('id') };
  }

  async modifySchema(dto: ModifySchemaDto): Promise<ModifySchemaResponse> {
    await SchemaModel.update(dto, { where: { id: dto.id } });
    return null;
  }

  async removeSchema(dto: RemoveSchemaDto): Promise<RemoveSchemaResponse> {
    await SchemaModel.destroy({ where: { id: dto.id } });
    return null;
  }

  async findSchema(dto: FindSchemaDto): Promise<FindSchemaResponse> {
    const schemas = await SchemaModel.findAll({
      where: dto.filter,
    });

    return schemas.map((schema) => {
      return {
        id: schema.getDataValue('id'),
        name: schema.getDataValue('name'),
        type: schema.getDataValue('type'),
        url: schema.getDataValue('url'),
        secretKey: schema.getDataValue('secretKey'),
        tables: schema.getDataValue('tables'),
      };
    });
  }
}
