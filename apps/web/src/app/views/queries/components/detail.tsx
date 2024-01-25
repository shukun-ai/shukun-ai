import {
  Query,
  QueryRetrieveOutput,
  QueryUpdateInput,
  Result,
  update,
} from '@ailake/apitype';
import { Box, Button, Flex, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { updateQuery } from '../../../../apis/query';
import { useMutation } from '@tanstack/react-query';
import { Metadata } from './metadata';
import { DetailProvider } from './detail-context';
import { useSqlToResult } from './use-sql-to-result';
import { useTextToSql } from './use-text-to-sql';
import { useCallback, useState } from 'react';
import { useTextToResult } from './use-text-to-result';

export type DetailProps = {
  query: QueryRetrieveOutput;
};

export const Detail = ({ query }: DetailProps) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryUpdateInput) => {
      return updateQuery(props);
    },
  });

  const form = useForm<{ name: string; metadata: Query }>({
    initialValues: query,
  });

  const [activeStepIndex, setActiveStepIndex] = useState<number | undefined>(0);

  const [globalSchemaId, setGlobalSchemaId] = useState<string | undefined>(
    undefined
  );

  const [results, setResults] = useState<Result[]>([]);

  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  const { runTextToResult } = useTextToResult({
    metadata: form.values.metadata,
    onTextToResult: (generatedQuery, queriedFields, result, stepIndex) => {
      const steps = form.values.metadata.steps;
      const newSteps = structuredClone(steps);
      newSteps[stepIndex].generatedQuery = generatedQuery;
      newSteps[stepIndex].queriedFields = queriedFields;
      form.setFieldValue('metadata', {
        ...form.values.metadata,
        steps: newSteps,
      });
      setResults((results) => update(results, stepIndex, result));
    },
  });

  const { runTextToSql } = useTextToSql({
    metadata: form.values.metadata,
    onTextToSql: (generatedQuery, stepIndex) => {
      const steps = form.values.metadata.steps;
      const newSteps = structuredClone(steps);
      newSteps[stepIndex].generatedQuery = generatedQuery;
      form.setFieldValue('metadata', {
        ...form.values.metadata,
        steps: newSteps,
      });
    },
  });

  const { runSqlToResult } = useSqlToResult({
    metadata: form.values.metadata,
    onSqlToResult: (queriedFields, result, stepIndex) => {
      const steps = form.values.metadata.steps;
      const newSteps = structuredClone(steps);
      newSteps[stepIndex].queriedFields = queriedFields;
      form.setFieldValue('metadata', {
        ...form.values.metadata,
        steps: newSteps,
      });
      setResults((results) => update(results, stepIndex, result));
    },
  });

  const setAllSchemaIds = useCallback(
    (schemaId: string | undefined) => {
      console.log(schemaId);
      setGlobalSchemaId(schemaId);
      const steps = form.values.metadata.steps;
      const newSteps = steps.map((step) => {
        return {
          ...step,
          schemaId: schemaId,
        };
      });

      form.setFieldValue('metadata', {
        ...form.values.metadata,
        steps: newSteps,
      });
    },
    [form]
  );

  return (
    <form>
      <DetailProvider
        value={{
          activeStepIndex,
          setActiveStepIndex,
          runTextToResult,
          runTextToSql,
          runSqlToResult,
          globalSchemaId,
          setGlobalSchemaId: setAllSchemaIds,
          results,
          globalLoading,
          setGlobalLoading,
        }}
      >
        <Box style={{ maxWidth: 1440 }}>
          <Flex justify="space-between">
            <Box>
              <Title order={3}>Query Configuration</Title>
              <Title order={6} mb="md">
                {form.values.name}
              </Title>
            </Box>
            <Button
              variant="gradient"
              loading={isPending}
              onClick={async () => {
                await mutateAsync({
                  queryId: query.queryId,
                  ...form.values,
                });
              }}
              radius="md"
            >
              Save
            </Button>
          </Flex>
        </Box>

        <Metadata {...form.getInputProps('metadata')} />
      </DetailProvider>
    </form>
  );
};
