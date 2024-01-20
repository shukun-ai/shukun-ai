import { Body, Controller, Post } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import {
  TemplateRetrieveOutput,
  TemplateListOutput,
  apiPath,
  TemplateRetrieveInput,
  TemplateCreateInput,
  TemplateCreateOutput,
  TemplateUpdateInput,
  TemplateUpdateOutput,
} from '@ailake/apitype';

@Controller()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post(apiPath.templates.retrieve)
  async retrieve(
    @Body() props: TemplateRetrieveInput
  ): Promise<TemplateRetrieveOutput> {
    return await this.templateService.retrieve(props);
  }

  @Post(apiPath.templates.list)
  async list(): Promise<TemplateListOutput> {
    return await this.templateService.list();
  }

  @Post(apiPath.templates.create)
  async create(
    @Body() props: TemplateCreateInput
  ): Promise<TemplateCreateOutput> {
    return await this.templateService.create(props);
  }

  @Post(apiPath.templates.update)
  async update(
    @Body() props: TemplateUpdateInput
  ): Promise<TemplateUpdateOutput> {
    return await this.templateService.update(props);
  }
}
