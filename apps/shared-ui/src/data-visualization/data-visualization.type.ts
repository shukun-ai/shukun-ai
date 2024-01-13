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
  fields: DataCollectionField[];
  rows: Record<string, unknown>[];
};

export type DataCollectionField = {
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
    | 'polygon';
  name: string;
};
