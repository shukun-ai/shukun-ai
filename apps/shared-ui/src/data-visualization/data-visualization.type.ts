export type DataResult = {
  data: DataCollection;
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
    | 'polygon'
    | 'interval';
  name: string;
};
