import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { PrismaClientBasicModule } from '@ailake/prisma-client-basic';

@Module({
  imports: [PrismaClientBasicModule],
  controllers: [],
  providers: [SchemaService],
  exports: [SchemaService],
})
export class SchemaModule {}
