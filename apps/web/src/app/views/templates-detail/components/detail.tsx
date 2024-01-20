import { TemplateRetrieveOutput } from '@ailake/apitype';
import { Box, Title } from '@mantine/core';
import { Step } from './step';

export type DetailProps = {
  template: TemplateRetrieveOutput;
};

export const Detail = ({ template }: DetailProps) => {
  return (
    <Box style={{ maxWidth: 800 }}>
      <Title order={3} mb="md">
        {template.name}
      </Title>
      {template.steps.map((step) => (
        <Box mb="md">
          <Step step={step} />
        </Box>
      ))}
    </Box>
  );
};
