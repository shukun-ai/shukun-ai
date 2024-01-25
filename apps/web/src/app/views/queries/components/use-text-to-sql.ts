import {
  Query,
  QueryGeneratedQuery,
  QueryGeneratorTextToSqlInput,
} from '@ailake/apitype';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { textToSql } from '../../../../apis/query-generator';

export const useTextToSql = ({
  metadata,
  onTextToSql,
}: {
  metadata: Query;
  onTextToSql: (generatedQuery: QueryGeneratedQuery, stepIndex: number) => void;
}) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryGeneratorTextToSqlInput) => {
      return textToSql(props);
    },
  });

  const runTextToSql = useCallback(
    async ({ stepIndex }: { stepIndex: number }) => {
      const data = await mutateAsync({
        metadata,
        stepIndex,
      });

      onTextToSql(data.generatedQuery, stepIndex);
    },
    [metadata, mutateAsync, onTextToSql]
  );

  return {
    runTextToSql,
    isGeneratePending: isPending,
  };
};
