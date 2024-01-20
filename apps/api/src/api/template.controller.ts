import { Controller, Post } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import {
  TemplateRetrieveOutput,
  TemplateListOutput,
  apiPath,
} from '@ailake/apitype';
import { getTemplatePromptTask } from './template-prompt';
import { getTemplateSql } from './template-sql';

@Controller()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post(apiPath.templates.retrieve)
  async retrieve(): // props: TemplateRetrieveInput
  Promise<TemplateRetrieveOutput> {
    return {
      templateId: 't1',
      name: '实付佣金计算表',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      steps: [
        {
          stepId: 's1',
          name: 'name',
          metadata: {
            type: 'text',
            tip: '请输入姓名',
            optional: false,
            maxLength: 100,
          },
        },
        {
          stepId: 's2',
          name: 'dbQuery',
          metadata: {
            type: 'dbQuery',
            promptTask: getTemplatePromptTask(),
            sql: getTemplateSql(),
            tables: [
              {
                schemaName: '销售数据库',
                tableName: '净利润表',
              },
              {
                schemaName: '销售数据库',
                tableName: '账龄表',
              },
            ],
          },
        },
      ],
    };
  }

  @Post(apiPath.templates.list)
  async list(): Promise<TemplateListOutput> {
    return [
      {
        templateId: 't1',
        name: '实付佣金计算表',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}
