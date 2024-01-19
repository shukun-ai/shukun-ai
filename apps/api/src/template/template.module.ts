import { Module } from '@nestjs/common';
import { PrismaClientBasicModule } from '@ailake/prisma-client-basic';
import { TemplateService } from './template.service';

@Module({
  imports: [PrismaClientBasicModule],
  controllers: [],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
