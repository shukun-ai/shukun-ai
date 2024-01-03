import { IsoDateString } from '../shared.type';

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
    format: string;
    name: string;
  }[];
  rows: Record<string, unknown>[];
};
