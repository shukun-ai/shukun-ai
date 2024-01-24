import { Query } from '@ailake/apitype';
import { Box } from '@mantine/core';
import { Steps } from './steps';

export type MetadataProps = {
  value: Query;
  onChange: (metadata: Query) => void;
};

export const Metadata = ({ value, onChange }: MetadataProps) => {
  return (
    <Box>
      <Steps
        value={value.steps}
        onChange={(steps) => {
          onChange({
            ...value,
            steps,
          });
        }}
      />
    </Box>
  );
};
