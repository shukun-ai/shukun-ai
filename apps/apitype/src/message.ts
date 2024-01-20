import { ThreadMessageMetadata } from './thread';

export type MessageCreateInput = {
  threadId: string;
  role: 'user' | 'assistant';
  metadata: ThreadMessageMetadata;
};

export type MessageCreateOutput = {
  yourMessage: {
    messageId: string;
    createdAt: string;
    updatedAt: string;
    role: 'user';
    metadata: ThreadMessageMetadata;
  };
  assistantMessage: {
    messageId: string;
    createdAt: string;
    updatedAt: string;
    role: 'assistant';
    metadata: ThreadMessageMetadata;
  }[];
};
