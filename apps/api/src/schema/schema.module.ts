import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { PrismaClientBasicModule } from '@shukun-ai/prisma-client-basic';
import { DbQueryModule } from '../db-query/db-query.module';

@Module({
  imports: [PrismaClientBasicModule, DbQueryModule],
  controllers: [],
  providers: [SchemaService],
  exports: [SchemaService],
})
export class SchemaModule {}
