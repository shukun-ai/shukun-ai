import { Injectable } from '@nestjs/common';
import { PrismaService } from '@ailake/prisma-client-basic';
import {
  CreateRequest,
  CreateResponse,
  ListResponse,
  RetrieveRequest,
  RetrieveResponse,
  UpdateRequest,
  UpdateResponse,
} from './template.type';

@Injectable()
export class TemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const template = await this.prismaService.template.findFirstOrThrow({
      where: {
        templateId: props.templateId,
      },
    });

    return {
      ...template,
      sqlParameters:
        template.sqlParameters as RetrieveResponse['sqlParameters'],
    };
  }

  async list(): Promise<ListResponse> {
    const templates = await this.prismaService.template.findMany({
      select: {
        templateId: true,
        name: true,
      },
    });

    return templates;
  }

  async create(props: CreateRequest): Promise<CreateResponse> {
    const template = await this.prismaService.template.create({
      data: {
        name: props.name,
        taskTemplate: props.taskTemplate,
        sqlTemplate: props.sqlTemplate,
        sqlParameters: props.sqlParameters,
        schema: {
          connect: {
            schemaId: props.schemaId,
          },
        },
      },
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
        taskTemplate: props.taskTemplate,
        sqlTemplate: props.sqlTemplate,
        sqlParameters: props.sqlParameters,
        schema: {
          connect: {
            schemaId: props.schemaId,
          },
        },
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
