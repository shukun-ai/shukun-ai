import { Controller, Post } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import {
  TemplateRetrieveInput,
  TemplateRetrieveOutput,
  TemplateCreateInput,
  TemplateCreateOutput,
  TemplateUpdateInput,
  TemplateUpdateOutput,
  TemplateListOutput,
  apiPath,
} from '@ailake/apitype';

@Controller()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post(apiPath.templates.retrieve)
  async retrieve(
    props: TemplateRetrieveInput
  ): Promise<TemplateRetrieveOutput> {
    const template = await this.templateService.retrieve(props);
    return template;
  }

  @Post(apiPath.templates.list)
  async list(): Promise<TemplateListOutput> {
    const templates = await this.templateService.list();
    return templates;
  }

  @Post(apiPath.templates.create)
  async create(props: TemplateCreateInput): Promise<TemplateCreateOutput> {
    const template = await this.templateService.create(props);
    return template;
  }

  @Post(apiPath.templates.update)
  async update(props: TemplateUpdateInput): Promise<TemplateUpdateOutput> {
    const template = await this.templateService.update(props);
    return template;
  }
}
