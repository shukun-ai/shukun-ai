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
  onChange: (metadata: TemplateStepMetadataText) => void;
};

export const StepText = ({ metadata, onChange }: StepTextProps) => {
  return (
    <Box>
      <Card withBorder>
        <Title order={4}>输入文字</Title>
        <TextInput
          label="提示文字"
          value={metadata.tip}
          onChange={(event) => {
            onChange({
              ...metadata,
              tip: event.currentTarget.value,
            });
          }}
        />
        <Switch
          label="是否可选"
          checked={metadata.optional}
          onChange={(event) => {
            onChange({
              ...metadata,
              optional: event.currentTarget.checked,
            });
          }}
        />
        <NumberInput
          label="最大输入字数"
          value={metadata.maxLength}
          onChange={(event) => {
            onChange({
              ...metadata,
              maxLength: typeof event === 'number' ? event : 0,
            });
          }}
        />
      </Card>
    </Box>
  );
};
