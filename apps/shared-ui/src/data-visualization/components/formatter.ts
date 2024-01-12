import { ValueFormatterParams } from 'ag-grid-community';
import { format } from 'date-fns';

export const createFormatter = (field: Field) => {
  return (params: ValueFormatterParams) => {
    if (field.type === 'date') {
      return format(new Date(params.value), 'yyyy-MM-dd');
    }
    if (field.type === 'dateTime') {
      return format(new Date(params.value), 'yyyy-MM-dd HH:mm:ss');
    }
    if (field.type === 'time') {
      return format(new Date(params.value), 'HH:mm:ss');
    }
    return params.value;
  };
};

type Field = {
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
