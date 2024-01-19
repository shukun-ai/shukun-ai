import { Module } from '@nestjs/common';

import { TemplateModule } from '../template/template.module';
import { TemplateController } from './template.controller';

@Module({
  imports: [TemplateModule],
  controllers: [TemplateController],
  providers: [],
})
export class ApiModule {}
