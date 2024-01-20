import { DataCollection } from './lib/conversation.type';

export type ThreadRetrieveInput = {
  threadId: string;
};

export type ThreadRetrieveOutput = {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ThreadMessage[];
};

export type ThreadListInput = {
  //
};

export type ThreadListOutput = {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}[];

export type ThreadCreateInput = {
  templateId: string;
};

export type ThreadCreateOutput = {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ThreadMessage[];
};

export type ThreadUpdateInput = {
  //
};

export type ThreadUpdateOutput = {
  //
};

export type ThreadRemoveInput = {
  //
};

export type ThreadRemoveOutput = {
  //
};

export type ThreadMessage = {
  messageId: string;
  createdAt: string;
  updatedAt: string;
  role: 'system' | 'user' | 'assistant';
  metadata: ThreadMessageMetadata;
};

export type ThreadMessageMetadata =
  | ThreadMessageUserTemplate
  | ThreadMessageAssistantText
  | ThreadMessageUserInput
  | ThreadMessageAssistantDbQuery;

export type ThreadMessageUserTemplate = {
  type: 'userTemplate';
  text: string;
};

export type ThreadMessageAssistantText = {
  type: 'assistantText';
  text: string;
};

export type ThreadMessageUserInput = {
  type: 'userInput';
  text: string;
};

export type ThreadMessageAssistantDbQuery = {
  type: 'assistantDbQuery';
  data: DataCollection; // TODO: extract DataCollection to a separate file
  sqlParameters: Record<string, unknown>;
  sql: string;
};
