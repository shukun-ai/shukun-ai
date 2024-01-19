import { Injectable } from '@nestjs/common';
import { PrismaService } from '@ailake/prisma-client-basic';
import { schema } from './schema.mock';

@Injectable()
export class SchemaService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve() {
    return schema;
  }
}
