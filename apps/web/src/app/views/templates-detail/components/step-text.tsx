import { TemplateStepMetadataText } from '@ailake/apitype';
import { Box, Card, Group, TextInput, Title } from '@mantine/core';
import { IconInfoCircle, IconUserEdit } from '@tabler/icons-react';

export type StepTextProps = {
  metadata: TemplateStepMetadataText;
  onChange: (metadata: TemplateStepMetadataText) => void;
};

export const StepText = ({ metadata, onChange }: StepTextProps) => {
  return (
    <Box>
      <Card radius="md" style={{ background: '#f2f2f2' }}>
        <Group mb={8} spacing={8}>
          <IconUserEdit size="1rem" />
          <Title order={5}>助理需要知道的信息</Title>
          <IconInfoCircle size="1rem" color="gray" />
        </Group>
        <Card withBorder radius="md" style={{ background: '#fff' }}>
          <TextInput
            label="发送给用户询问用户输入的提示文字"
            value={metadata.tip}
            onChange={(event) => {
              onChange({
                ...metadata,
                tip: event.currentTarget.value,
              });
            }}
            mb={8}
          />
          {/* <Switch
            label="是不是选填项"
            checked={metadata.optional}
            onChange={(event) => {
              onChange({
                ...metadata,
                optional: event.currentTarget.checked,
              });
            }}
            mb={8}
          /> */}
          {/* <NumberInput
            label="最大输入字数"
            value={metadata.maxLength}
            onChange={(event) => {
              onChange({
                ...metadata,
                maxLength: typeof event === 'number' ? event : 0,
              });
            }}
          /> */}
        </Card>
      </Card>
    </Box>
  );
};
