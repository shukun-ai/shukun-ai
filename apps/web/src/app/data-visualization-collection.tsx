import { DataCollection, DataResult } from '@ailake/apitype';
import { Box, Table } from '@mantine/core';
import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

export type DataVisualizationCollectionProps = {
  dataResult: DataResult;
  data: DataCollection;
};

export const DataVisualizationCollection = ({
  data,
}: DataVisualizationCollectionProps) => {
  const columns = useMemo(() => data.fields.map((field) => field.name), [data]);

  return (
    <Box>
      {columns.length === 2 && <DataVisualizationChart data={data} />}

      <Box style={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
        <Table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr>
                {columns.map((column) => (
                  <td>
                    <FormattedCell value={row[column]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export const FormattedCell = ({ value }: { value: unknown }) => {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'boolean') {
    return value.toString();
  } else {
    return JSON.stringify(value);
  }
};

export const DataVisualizationChart = ({ data }: { data: DataCollection }) => {
  const xData = useMemo(() => {
    return data.rows.map((row) => row[data.fields[0].name]);
  }, [data.fields, data.rows]);

  const yData = useMemo(() => {
    return data.rows.map((row) => row[data.fields[1].name]);
  }, [data.fields, data.rows]);

  console.log(xData, yData);

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yData,
        type: 'bar',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return <ReactECharts option={options} />;
};
