import { ThreadMessageMetadata } from './thread';

export type MessageCreateInput = {
  threadId: string;
  role: 'user';
  metadata: ThreadMessageMetadata;
};

export type MessageCreateOutput = {
  userMessage: {
    messageId: string;
    createdAt: string;
    updatedAt: string;
    role: 'system' | 'user' | 'assistant';
    metadata: ThreadMessageMetadata;
  };
  assistantMessage: {
    messageId: string;
    createdAt: string;
    updatedAt: string;
    role: 'system' | 'user' | 'assistant';
    metadata: ThreadMessageMetadata;
  };
};
