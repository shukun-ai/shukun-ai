export type IsoDateString = string; // ISO 8601 date string, e.g. '2020-01-01T00:00:00.000Z'

export type Conversation = {
  id: string;
  createdAt: IsoDateString;
};

export type Comment = {
  id: string;
  conversationId: string;
  belongUserId: string;
  sentByRobot: boolean;
  commentType: 'text' | 'data';
  commentText: string | null;
  commentSQL: string | null;
  createdAt: IsoDateString;
  isLoading?: boolean;
};

export type DataResult = {
  id: string;
  commentId: string;
  belongUserId: string;
  sql: string;
  data: DataCollection;
  createdAt: IsoDateString;
};

export type DataCollection = {
  type: 'Collection';
  command: string;
  fields: {
    type:
      | 'text'
      | 'int'
      | 'float'
      | 'bool'
      | 'date'
      | 'time'
      | 'dateTime'
      | 'money'
      | 'byte'
      | 'code'
      | 'polygon'
      | 'interval';
    name: string;
  }[];
  rows: Record<string, unknown>[];
};
