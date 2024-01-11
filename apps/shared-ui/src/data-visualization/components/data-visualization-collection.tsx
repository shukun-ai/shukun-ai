import { DataCollection, DataResult } from '../data-visualization.type';
import { Box, Button, Group, Table } from '@mantine/core';
import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';

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
      <DataVisualizationTable data={data} />
    </Box>
  );
};

export const DataVisualizationTable = ({ data }: { data: DataCollection }) => {
  const { t } = useTranslation();

  const columns = useMemo(() => data.fields.map((field) => field.name), [data]);

  return (
    <Box style={{ width: '100%' }}>
      <Group spacing={0} position="right">
        <Button variant="white" size="xs" color="gray">
          {t('conversation.exportTableExcel')}
        </Button>
      </Group>
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
  const { t } = useTranslation();

  const xData = useMemo(() => {
    return data.rows.map((row) => row[data.fields[0].name]);
  }, [data.fields, data.rows]);

  const yData = useMemo(() => {
    return data.rows.map((row) => row[data.fields[1].name]);
  }, [data.fields, data.rows]);

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

  return (
    <Box>
      <Group spacing={0} position="right">
        <Button variant="white" size="xs" color="gray">
          {t('conversation.exportChartPdf')}
        </Button>
      </Group>
      <ReactECharts option={options} />
    </Box>
  );
};
