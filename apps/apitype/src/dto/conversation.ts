import { Conversation, DataResult, Comment } from '../lib/conversation.type';

export type CreateConversationDto = {
  ask: string;
  askCommentId: string;
  conversationId: string;
};

export type CreateConversationResponse = {
  conversation: Conversation;
  askComment: Comment;
  replyComment: Comment;
  dataResult: DataResult;
};
