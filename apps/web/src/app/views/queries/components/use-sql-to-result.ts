import {
  Query,
  QueryGeneratorSqlToResultInput,
  QueryQueriedFields,
} from '@ailake/apitype';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sqlToResult } from '../../../../apis/query-generator';

export const useSqlToResult = ({
  metadata,
  onSqlToResult,
}: {
  metadata: Query;
  onSqlToResult: (queriedFields: QueryQueriedFields, stepIndex: number) => void;
}) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryGeneratorSqlToResultInput) => {
      return sqlToResult(props);
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

      onSqlToResult(queriedFields, stepIndex);
    },
    [metadata, mutateAsync, onSqlToResult]
  );

  return {
    runSqlToResult,
    isGeneratePending: isPending,
  };
};
