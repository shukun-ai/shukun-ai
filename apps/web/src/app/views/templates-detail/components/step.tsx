import { TemplateStep } from '@ailake/apitype';
import { StepText } from './step-text';
import { StepDbQuery } from './step-db-query';

export type StepProps = {
  step: TemplateStep;
};

export const Step = ({ step }: StepProps) => {
  switch (step.metadata.type) {
    case 'text':
      return <StepText metadata={step.metadata} />;
    case 'dbQuery':
      return <StepDbQuery metadata={step.metadata} />;
  }
};
