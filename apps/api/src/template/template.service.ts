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
import { TemplateStep } from '@ailake/apitype';

@Injectable()
export class TemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(props: RetrieveRequest): Promise<RetrieveResponse> {
    const template = await this.prismaService.template.findUniqueOrThrow({
      where: {
        templateId: props.templateId,
      },
      select: {
        templateId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        steps: true,
      },
    });

    return {
      ...template,
      steps: template.steps as TemplateStep[],
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
    };
  }

  async list(): Promise<ListResponse> {
    const templates = await this.prismaService.template.findMany({
      select: {
        templateId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return templates.map((template) => ({
      ...template,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
    }));
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
