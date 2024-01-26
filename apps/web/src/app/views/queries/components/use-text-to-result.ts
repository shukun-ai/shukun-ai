import {
  Query,
  QueryGeneratedQuery,
  QueryGeneratorSqlToResultInput,
  QueryGeneratorTextToSqlInput,
  QueryQueriedFields,
  Result,
} from '@ailake/apitype';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sqlToResult, textToSql } from '../../../../apis/query-generator';

export const useTextToResult = ({
  metadata,
  onTextToResult,
  setGlobalLoading,
}: {
  metadata: Query;
  onTextToResult: (
    generatedQuery: QueryGeneratedQuery,
    queriedFields: QueryQueriedFields,
    result: Result,
    stepIndex: number
  ) => void;
  setGlobalLoading: (loading: boolean) => void;
}) => {
  const { isPending: textToSqlIsPending, mutateAsync: textToSqlMutateAsync } =
    useMutation({
      mutationFn: (props: QueryGeneratorTextToSqlInput) => {
        return textToSql(props);
      },
      onMutate: () => {
        setGlobalLoading(true);
      },
      onSettled: () => {
        setGlobalLoading(false);
      },
    });

  const {
    isPending: sqlToResultIsPending,
    mutateAsync: sqlToResultMutateAsync,
  } = useMutation({
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

  const runTextToResult = useCallback(
    async ({ stepIndex }: { stepIndex: number }) => {
      const response1 = await textToSqlMutateAsync({
        metadata,
        stepIndex,
      });

      const generatedQuery = response1.generatedQuery;
      const steps = metadata.steps;
      const newSteps = structuredClone(steps);
      newSteps[stepIndex].generatedQuery = generatedQuery;
      const newMetadata = {
        ...metadata,
        steps: newSteps,
      };

      const response2 = await sqlToResultMutateAsync({
        metadata: newMetadata,
        stepIndex,
      });

      const queriedFields: QueryQueriedFields = {
        fields: response2.result.fields,
        lastGeneratedAt: new Date().toString(),
      };

      const result: Result = response2.result;

      onTextToResult(
        response1.generatedQuery,
        queriedFields,
        result,
        stepIndex
      );
    },
    [metadata, onTextToResult, sqlToResultMutateAsync, textToSqlMutateAsync]
  );

  return {
    runTextToResult,
    textToSqlIsPending,
    sqlToResultIsPending,
  };
};
