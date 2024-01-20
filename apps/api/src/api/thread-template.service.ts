import { Injectable } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import { ThreadService } from '../thread/thread.service';
import { MessageService } from '../message/message.service';
import { TemplateStep, ThreadMessageMetadata } from '@ailake/apitype';

@Injectable()
export class ThreadTemplateService {
  constructor(
    private readonly templateService: TemplateService,
    private readonly threadService: ThreadService,
    private readonly messageService: MessageService
  ) {}

  async createNextMessage(props: Props): Promise<Output> {
    const userInputKeys: string[] = [];

    props.messages.forEach((message) => {
      if (message.metadata.type === 'userInput') {
        userInputKeys.push(message.metadata.inputKey);
      }
    });

    const inputs = props.template.steps
      .filter((step) => step.metadata.type === 'text')
      .map((step) => step.name);

    if (userInputKeys.length === inputs.length) {
      return await this.createAssistantRun(props);
    } else {
      return await this.createAssistantInput(props, inputs, userInputKeys);
    }
  }

  async createAssistantRun(props: Props): Promise<Output> {
    return {
      role: 'assistant',
      metadata: {
        type: 'assistantDbQuery',
        data: {
          type: 'Collection',
          command: '',
          fields: [],
          rows: [],
        },
        sqlParameters: {},
        sql: '',
      },
    };
  }

  async createAssistantInput(
    props: Props,
    stepInputs: string[],
    userInputKeys: string[]
  ): Promise<Output> {
    const nextKey = stepInputs[userInputKeys.length];

    const step = props.template.steps.find((step) => step.name === nextKey);

    return {
      role: 'assistant',
      metadata: {
        type: 'assistantText',
        text: step?.metadata.type === 'text' ? step.metadata.tip : '',
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
