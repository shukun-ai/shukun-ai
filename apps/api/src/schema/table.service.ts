import { PushTablesDto, PushTablesResponse } from '@ailake/apitype';
import { Injectable } from '@nestjs/common';
import { SchemaModel } from './schema.model';

@Injectable()
export class TableService {
  constructor() {}

  async pushTables(dto: PushTablesDto): Promise<PushTablesResponse> {
    await SchemaModel.update(
      {
        tables: dto.tables,
      },
      { where: { name: dto.schemaName } }
    );
    return null;
  }
}
