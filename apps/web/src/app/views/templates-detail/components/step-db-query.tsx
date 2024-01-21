import {
  TemplateGenerateInput,
  TemplateStepMetadataDbQuery,
} from '@ailake/apitype';
import { Box, Button, Card, Group, Textarea, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { generateTemplate } from '../../../../apis/template';
import { Prism } from '@mantine/prism';

export type StepDbQueryProps = {
  metadata: TemplateStepMetadataDbQuery;
  onChange: (metadata: TemplateStepMetadataDbQuery) => void;
};

export const StepDbQuery = ({ metadata, onChange }: StepDbQueryProps) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: TemplateGenerateInput) => {
      return generateTemplate(props);
    },
  });

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
          <Button
            variant="outline"
            loading={isPending}
            onClick={async () => {
              const data = await mutateAsync({
                promptTask: metadata.promptTask,
              });
              onChange({
                ...metadata,
                sql: data.sql,
              });
            }}
          >
            生成 SQL
          </Button>
        </Group>
        <Prism language="sql">{metadata.sql}</Prism>
      </Card>
    </Box>
  );
};
