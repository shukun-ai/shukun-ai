import { TemplateStepMetadataDbQuery } from '@ailake/apitype';
import {
  Box,
  Button,
  Card,
  Group,
  MultiSelect,
  Textarea,
  Title,
} from '@mantine/core';

export type StepDbQueryProps = {
  metadata: TemplateStepMetadataDbQuery;
};

export const StepDbQuery = ({ metadata }: StepDbQueryProps) => {
  return (
    <Box>
      <Card withBorder>
        <Title order={4} mb="md">
          查询数据库
        </Title>
        <Textarea
          label="任务"
          value={metadata.promptTask}
          minRows={10}
          autosize
        />
        <MultiSelect
          data={metadata.tables.map((table) => ({
            label: `${table.schemaName}.${table.tableName}`,
            value: `${table.schemaName}.${table.tableName}`,
          }))}
          limit={20}
          value={['销售数据库.净利润表', '销售数据库.账龄表']}
          searchable
          label="选择数据表"
        />
        <Group position="apart" pt="md">
          <Box></Box>
          <Button variant="outline">生成 SQL</Button>
        </Group>
        <Textarea
          label="SQL"
          value={metadata.sql}
          minRows={1}
          autosize
          readOnly
        />
      </Card>
    </Box>
  );
};
