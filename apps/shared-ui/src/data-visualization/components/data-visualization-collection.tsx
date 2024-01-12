import { DataCollection, DataResult } from '../data-visualization.type';
import { Box, Button, Group } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { createFormatter } from './formatter';
import { toSentenceCase } from 'js-convert-case';

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

  const [rowData, setRowData] = useState<Record<string, unknown>[]>([]);

  const [colDefs, setColDefs] = useState<ColDef<Record<string, unknown>>[]>();

  useEffect(() => {
    setRowData(data.rows);
  }, [data.rows]);

  useEffect(() => {
    const colDefs: ColDef<Record<string, unknown>>[] = data.fields.map(
      (field) => {
        return {
          headerName: toSentenceCase(field.name),
          field: field.name,
          valueFormatter: createFormatter(field),
        };
      }
    );
    setColDefs(colDefs);
  }, [data.fields]);

  return (
    <Box style={{ width: '100%' }}>
      <Group spacing={0} position="right">
        <Button variant="white" size="xs" color="gray">
          {t('conversation.exportTableExcel')}
        </Button>
      </Group>
      <Box className="ag-theme-quartz" style={{ width: '100%', height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
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
