import { Injectable } from '@nestjs/common';
import { PrismaService } from '@ailake/prisma-client-basic';
import {
  RetrieveRequest,
  RetrieveResponse,
  ListResponse,
  CreateRequest,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
} from './template.type';
import { getTemplatePromptTask } from '../api/template-prompt';
import { getTemplateSql } from '../api/template-sql';

@Injectable()
export class TemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    // const template = await this.prismaService.template.findUniqueOrThrow({
    //   where: {
    //     templateId: props.templateId,
    //   },
    //   select: {
    //     templateId: true,
    //     name: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     steps: true,
    //   },
    // });

    // return {
    //   ...template,
    //   steps: template.steps as TemplateStep[],
    //   createdAt: template.createdAt.toISOString(),
    //   updatedAt: template.updatedAt.toISOString(),
    // };
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
            tip: '请输入姓名？',
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

  async list(): Promise<ListResponse> {
    // const templates = await this.prismaService.template.findMany({
    //   select: {
    //     templateId: true,
    //     name: true,
    //     createdAt: true,
    //     updatedAt: true,
    //   },
    // });

    // return templates.map((template) => ({
    //   ...template,
    //   createdAt: template.createdAt.toISOString(),
    //   updatedAt: template.updatedAt.toISOString(),
    // }));
    return [
      {
        templateId: 't1',
        name: '实付佣金计算表',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const template = await this.prismaService.template.create({
      data: props,
      select: {
        templateId: true,
      },
    });

    return {
      templateId: template.templateId,
    };
  }

  async update(props: UpdateRequest): Promise<UpdateResponse> {
    const template = await this.prismaService.template.update({
      where: {
        templateId: props.templateId,
      },
      data: {
        name: props.name,
        steps: props.steps,
      },
      select: {
        templateId: true,
      },
    });

    return {
      templateId: template.templateId,
    };
  }
}
