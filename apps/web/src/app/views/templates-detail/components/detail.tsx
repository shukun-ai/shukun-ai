import {
  TemplateRetrieveOutput,
  TemplateStep,
  TemplateUpdateInput,
  update,
} from '@ailake/apitype';
import { Box, Button, Flex, Title } from '@mantine/core';
import { Step } from './step';
import { useForm } from '@mantine/form';
import { updateTemplate } from '../../../../apis/template';
import { useMutation } from '@tanstack/react-query';

export type DetailProps = {
  template: TemplateRetrieveOutput;
};

export const Detail = ({ template }: DetailProps) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: TemplateUpdateInput) => {
      return updateTemplate(props);
    },
  });

  const form = useForm<{ name: string; steps: TemplateStep[] }>({
    initialValues: template,
  });

  return (
    <form>
      <Box style={{ maxWidth: 1440 }}>
        <Flex justify="space-between">
          <Box>
            <Title order={3}>配置助理</Title>
            <Title order={6} mb="md">
              {form.values.name}
            </Title>
          </Box>
          <Button
            variant="gradient"
            loading={isPending}
            onClick={async () => {
              await mutateAsync({
                templateId: template.templateId,
                ...form.values,
              });
            }}
            radius="md"
          >
            保存并使用该助理
          </Button>
        </Flex>

        {form.values.steps.map((step, index) => (
          <Box mb="md">
            <Step
              step={step}
              onChange={(step) => {
                form.setFieldValue(
                  'steps',
                  update(form.values.steps, index, step)
                );
              }}
            />
          </Box>
        ))}
      </Box>
    </form>
  );
};
