import { SchemaListOutput } from '@ailake/apitype';
import { Box, Button, Group, Loader, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { listSchema } from '../../../../apis/schema';

export type SelectSchemaProps = {
  value: string | undefined;
  onChange: (schemaId: string | undefined) => void;
};

export const SelectSchema = ({ value, onChange }: SelectSchemaProps) => {
  const { isPending, error, data } = useQuery<SchemaListOutput>({
    queryKey: ['listSchema'],
    queryFn: async () => {
      return await listSchema({});
    },
  });

  if (isPending || !data) {
    return <Loader />;
  }

  if (error) {
    return <Box>{error.name}</Box>;
  }

  return (
    <Group>
      <Select
        label="Select Database"
        placeholder="Select a Database to ask"
        data={data.map((item) => ({
          label: item.name,
          value: item.schemaId,
        }))}
        withinPortal
        withAsterisk
        clearable
      />
      <Button variant="subtle" mt={20}>
        View Tables
      </Button>
    </Group>
  );
};
