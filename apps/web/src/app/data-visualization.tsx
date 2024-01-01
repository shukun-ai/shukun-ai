import { DataResult } from '@ailake/apitype';
import { Code } from '@mantine/core';

export type DataVisualizationProps = {
  dataResult: DataResult;
};

export const DataVisualization = ({ dataResult }: DataVisualizationProps) => {
  return (
    <Code block style={{ maxHeight: 200 }}>
      {JSON.stringify(dataResult, null, 2)}
    </Code>
  );
};
