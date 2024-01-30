import { SchemaListOutput } from '@shukun-ai/apitype';
import { Box, Group, Loader, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { listSchema } from '../../../../apis/schema';
import { useTranslation } from 'react-i18next';

export type SelectSchemaProps = {
  value: string | undefined;
  onChange: (schemaId: string | undefined) => void;
};

export const SelectSchema = ({ value, onChange }: SelectSchemaProps) => {
  const { t } = useTranslation();

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
        label={t('query.selectSchemaLabel')}
        placeholder={t('query.selectSchemaPlaceholder')}
        data={data.map((item) => ({
          label: item.name,
          value: item.schemaId,
        }))}
        value={value}
        onChange={(event) => {
          onChange(event ?? undefined);
        }}
        withinPortal
        withAsterisk
      />
      {/* TODO implement it */}
      {/* {value && (
        <Button variant="subtle" mt={20}>
          View Tables
        </Button>
      )} */}
    </Group>
  );
};
