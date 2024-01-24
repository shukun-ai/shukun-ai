import {
  Query,
  QueryGeneratedQuery,
  QueryGeneratorCreateInput,
} from '@ailake/apitype';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createQueryGenerator } from '../../../../apis/query-generator';

export const useGenerateStep = ({
  metadata,
  onGeneratedChange,
}: {
  metadata: Query;
  onGeneratedChange: (
    generatedQuery: QueryGeneratedQuery,
    stepIndex: number
  ) => void;
}) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryGeneratorCreateInput) => {
      return createQueryGenerator(props);
    },
  });

  const generateStep = useCallback(
    async ({ stepIndex }: { stepIndex: number }) => {
      const data = await mutateAsync({
        metadata,
        stepIndex,
      });

      onGeneratedChange(data.generatedQuery, stepIndex);
    },
    [metadata, mutateAsync, onGeneratedChange]
  );

  return {
    generateStep,
    isGeneratePending: isPending,
  };
};
