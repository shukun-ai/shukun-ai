import { ValueFormatterParams } from 'ag-grid-community';
import { format } from 'date-fns';
import { DataCollectionField } from '../data-visualization.type';

export const createFormatter = (field: DataCollectionField) => {
  return (params: ValueFormatterParams) => {
    if (params.value === null || params.value === undefined) {
      return '';
    }
    if (field.type === 'date') {
      return format(new Date(params.value), 'yyyy-MM-dd');
    }
    if (field.type === 'dateTime') {
      return format(new Date(params.value), 'yyyy-MM-dd HH:mm:ss');
    }
    if (field.type === 'time') {
      return format(new Date(params.value), 'HH:mm:ss');
    }
    if (field.type === 'interval') {
      const { milliseconds, seconds, minute } = params.value;

      let str = '';

      if (minute) {
        str += `${minute}分`;
      }

      if (seconds) {
        str += `${seconds}秒`;
      }

      if (milliseconds) {
        str += `${milliseconds}`;
      }

      return str;
    }
    return params.value;
  };
};
