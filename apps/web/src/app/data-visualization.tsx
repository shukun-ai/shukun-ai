import { DataResult } from '@ailake/apitype';
import { Code } from '@mantine/core';
import { DataVisualizationCollection } from './data-visualization-collection';

export type DataVisualizationProps = {
  dataResult: DataResult;
};

export const DataVisualization = ({ dataResult }: DataVisualizationProps) => {
  switch (dataResult.data.type) {
    case 'Collection':
      return (
        <DataVisualizationCollection
          dataResult={dataResult}
          data={dataResult.data}
        />
      );
    default:
      return (
        <Code block style={{ maxHeight: 200 }}>
          {JSON.stringify(dataResult, null, 2)}
        </Code>
      );
  }
};
