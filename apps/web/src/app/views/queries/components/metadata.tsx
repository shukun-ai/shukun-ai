import { Query, update } from '@shukun-ai/apitype';
import { Box, Grid } from '@mantine/core';
import { StepTabs } from './step-tabs';
import { StepContents } from './step-contents';
import { useDetailContext } from './detail-context';
import { SelectSchema } from './select-schema';

export type MetadataProps = {
  value: Query;
  onChange: (metadata: Query) => void;
};

export const Metadata = ({ value, onChange }: MetadataProps) => {
  const { activeStepIndex, globalSchemaId, setGlobalSchemaId } =
    useDetailContext();

  return (
    <Box>
      <SelectSchema
        value={globalSchemaId}
        onChange={(schemaId) => {
          setGlobalSchemaId(schemaId);
        }}
      />
      <Box mb={20} />
      {globalSchemaId && (
        <Grid>
          <Grid.Col span={3}>
            <StepTabs
              value={value.steps}
              onChange={(steps) => {
                onChange({
                  ...value,
                  steps,
                });
              }}
            />
          </Grid.Col>
          <Grid.Col span={9}>
            {typeof activeStepIndex === 'number' &&
              value.steps.length > 0 &&
              value.steps[activeStepIndex] && (
                <StepContents
                  value={value.steps[activeStepIndex]}
                  onChange={(step) => {
                    onChange({
                      ...value,
                      steps: update(value.steps, activeStepIndex, step),
                    });
                  }}
                  stepIndex={activeStepIndex}
                />
              )}
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
};
