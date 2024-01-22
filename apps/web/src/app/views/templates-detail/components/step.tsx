import { TemplateStep } from '@ailake/apitype';
import { StepText } from './step-text';
import { StepDbQuery } from './step-db-query';

export type StepProps = {
  step: TemplateStep;
  onChange: (step: TemplateStep) => void;
};

export const Step = ({ step, onChange }: StepProps) => {
  switch (step.metadata.type) {
    case 'text':
      return (
        <StepText
          metadata={step.metadata}
          onChange={(metadata) => {
            onChange({
              ...step,
              metadata,
            });
          }}
        />
      );
    case 'dbQuery':
      return (
        <StepDbQuery
          metadata={step.metadata}
          onChange={(metadata) => {
            onChange({
              ...step,
              metadata,
            });
          }}
        />
      );
  }
};
