import { TemplateStepMetadataText } from '@ailake/apitype';
import {
  Box,
  Card,
  NumberInput,
  Switch,
  TextInput,
  Title,
} from '@mantine/core';

export type StepTextProps = {
  metadata: TemplateStepMetadataText;
};

export const StepText = ({ metadata }: StepTextProps) => {
  return (
    <Box>
      <Card withBorder>
        <Title order={4}>输入文字</Title>
        <TextInput label="提示文字" value={metadata.tip} />
        <Switch label="是否可选" checked={metadata.optional} />
        <NumberInput label="最大输入字数" value={metadata.maxLength} />
      </Card>
    </Box>
  );
};
