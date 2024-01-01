import { DataCollection, DataResult } from '@ailake/apitype';
import { Box, Table } from '@mantine/core';
import { useMemo } from 'react';

export type DataVisualizationCollectionProps = {
  dataResult: DataResult;
  data: DataCollection;
};

export const DataVisualizationCollection = ({
  data,
}: DataVisualizationCollectionProps) => {
  const columns = useMemo(() => data.fields.map((field) => field.name), [data]);

  return (
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
