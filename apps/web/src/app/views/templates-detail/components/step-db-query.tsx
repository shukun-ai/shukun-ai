import {
  TemplateGenerateInput,
  TemplateStepMetadataDbQuery,
} from '@ailake/apitype';
import {
  Box,
  Button,
  Card,
  Collapse,
  Group,
  Textarea,
  Title,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { generateTemplate } from '../../../../apis/template';
import { Prism } from '@mantine/prism';
import { IconInfoCircle, IconListNumbers } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

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

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <Card>
        <Group mb={8} spacing={8}>
          <IconListNumbers size="1rem" />
          <Title order={5}>助理要完成的任务</Title>
          <IconInfoCircle size="1rem" color="gray" />
        </Group>

        <Textarea
          label="为助理编写任务将指引助理为了完成工作"
          value={metadata.promptTask}
          onChange={(event) => {
            onChange({
              ...metadata,
              promptTask: event.currentTarget.value,
            });
          }}
          minRows={10}
          autosize
          size="md"
        />
        <Group position="apart" pt="md">
          <Box></Box>
          <Group>
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
              让助理分析他的任务
            </Button>
            <Button variant="subtle" loading={isPending} onClick={toggle}>
              查看助理的分析过程
            </Button>
          </Group>
        </Group>
        <Box>
          <Collapse in={opened}>
            <Prism pt={20} language="sql">
              {metadata.sql}
            </Prism>
          </Collapse>
        </Box>
      </Card>
    </Box>
  );
};
