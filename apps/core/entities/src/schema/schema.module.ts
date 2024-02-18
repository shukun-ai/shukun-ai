import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { DrizzleClientModule } from 'drizzle-client';

@Module({
  imports: [DrizzleClientModule],
  controllers: [],
  providers: [SchemaService],
  exports: [SchemaService],
})
export class SchemaModule {}
