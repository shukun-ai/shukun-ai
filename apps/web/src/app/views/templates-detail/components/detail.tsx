import { TemplateRetrieveOutput, TemplateStep, update } from '@ailake/apitype';
import { Box, Button, Group, Title } from '@mantine/core';
import { Step } from './step';
import { useForm } from '@mantine/form';

export type DetailProps = {
  template: TemplateRetrieveOutput;
};

export const Detail = ({ template }: DetailProps) => {
  const form = useForm<{ name: string; steps: TemplateStep[] }>({
    initialValues: template,
  });

  return (
    <form>
      <Box style={{ maxWidth: 800 }}>
        <Group>
          <Title order={3} mb="md">
            {form.values.name}
          </Title>
          <Button
            size="xs"
            variant="light"
            onClick={() => {
              console.log('nihao', form.values);
            }}
          >
            保存
          </Button>
        </Group>
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
