import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { TableService } from './table.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SchemaService, TableService],
  exports: [SchemaService, TableService],
})
export class SchemaModule {}
