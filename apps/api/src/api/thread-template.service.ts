import { Injectable } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import { ThreadService } from '../thread/thread.service';
import { MessageService } from '../message/message.service';
import {
  TemplateStep,
  TemplateStepMetadataDbQuery,
  ThreadMessageMetadata,
} from '@ailake/apitype';
import { PostgresService } from '../db-query/postgres.service';

@Injectable()
export class ThreadTemplateService {
  constructor(
    private readonly templateService: TemplateService,
    private readonly threadService: ThreadService,
    private readonly messageService: MessageService,
    private readonly postgresService: PostgresService
  ) {}

  async createNextMessage(props: Props): Promise<Output> {
    const userInputKeys: Record<string, unknown> = {};

    props.messages.forEach((message) => {
      if (message.metadata.type === 'userInput') {
        userInputKeys[message.metadata.inputKey] = message.metadata.text;
      }
    });

    const inputs = props.template.steps
      .filter((step) => step.metadata.type === 'text')
      .map((step) => step.name);

    if (Object.keys(userInputKeys).length === inputs.length) {
      return await this.createAssistantRun(props, userInputKeys);
    } else {
      return await this.createAssistantInput(props, inputs, userInputKeys);
    }
  }

  private async createAssistantRun(
    props: Props,
    userInputKeys: Record<string, unknown>
  ): Promise<Output> {
    const step = props.template.steps[props.template.steps.length - 1];

    const { sql } = step.metadata as TemplateStepMetadataDbQuery;
    console.log('sql', step, sql);

    const data = await this.postgresService.run(sql);

    return {
      role: 'assistant',
      metadata: {
        type: 'assistantDbQuery',
        data: data,
        sqlParameters: userInputKeys,
        sql,
      },
    };
  }

  private async createAssistantInput(
    props: Props,
    stepInputs: string[],
    userInputKeys: Record<string, unknown>
  ): Promise<Output> {
    console.log(stepInputs, userInputKeys);
    const nextKey = stepInputs.find((stepInput) => !userInputKeys[stepInput]);

    if (!nextKey) {
      throw new Error('Did not find nextKey');
    }

    const step = props.template.steps.find((step) => step.name === nextKey);

    if (!step) {
      throw new Error('Did not find step');
    }

    return {
      role: 'assistant',
      metadata: {
        type: 'assistantText',
        text: step.metadata.type === 'text' ? step.metadata.tip : '',
        inputKey: nextKey,
      },
    };
  }
}

type Props = {
  messages: {
    role: 'system' | 'user' | 'assistant';
    metadata: ThreadMessageMetadata;
    threadId: string;
  }[];
  template: {
    templateId: string;
    name: string;
    steps: TemplateStep[];
  };
};

type Output = {
  role: 'system' | 'user' | 'assistant';
  metadata: ThreadMessageMetadata;
};
