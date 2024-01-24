import { QueryStep } from '@ailake/apitype';
import { useCallback } from 'react';

export const useExecuteStep = () => {
  const executeStep = useCallback(
    async (props: { stepIndex: number; step: QueryStep }) => {},
    []
  );

  return {
    executeStep,
  };
};
