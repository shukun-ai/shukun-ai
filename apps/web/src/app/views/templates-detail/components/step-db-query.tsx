import { TemplateStepMetadataDbQuery } from '@ailake/apitype';
import { Box, Button, Card, Group, Textarea, Title } from '@mantine/core';

export type StepDbQueryProps = {
  metadata: TemplateStepMetadataDbQuery;
  onChange: (metadata: TemplateStepMetadataDbQuery) => void;
};

export const StepDbQuery = ({ metadata, onChange }: StepDbQueryProps) => {
  return (
    <Box>
      <Card withBorder>
        <Title order={4} mb="md">
          查询数据库
        </Title>
        <Textarea
          label="任务"
          value={metadata.promptTask}
          onChange={(event) => {
            onChange({
              ...metadata,
              promptTask: event.currentTarget.value,
            });
          }}
          minRows={10}
          autosize
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
