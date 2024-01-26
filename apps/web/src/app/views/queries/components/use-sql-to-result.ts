import {
  Query,
  QueryGeneratorSqlToResultInput,
  QueryQueriedFields,
  Result,
} from '@ailake/apitype';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sqlToResult } from '../../../../apis/query-generator';

export const useSqlToResult = ({
  metadata,
  onSqlToResult,
  setGlobalLoading,
}: {
  metadata: Query;
  onSqlToResult: (
    queriedFields: QueryQueriedFields,
    result: Result,
    stepIndex: number
  ) => void;
  setGlobalLoading: (loading: boolean) => void;
}) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryGeneratorSqlToResultInput) => {
      return sqlToResult(props);
    },
    onMutate: () => {
      setGlobalLoading(true);
    },
    onSettled: () => {
      setGlobalLoading(false);
    },
  });

  const runSqlToResult = useCallback(
    async ({ stepIndex }: { stepIndex: number }) => {
      const data = await mutateAsync({
        metadata,
        stepIndex,
      });

      const queriedFields: QueryQueriedFields = {
        fields: data.result.fields,
        lastGeneratedAt: new Date().toString(),
      };

      const result: Result = data.result;

      onSqlToResult(queriedFields, result, stepIndex);
    },
    [metadata, mutateAsync, onSqlToResult]
  );

  return {
    runSqlToResult,
    isGeneratePending: isPending,
  };
};
