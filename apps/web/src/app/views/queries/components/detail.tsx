import {
  Query,
  QueryRetrieveOutput,
  QueryStep,
  QueryUpdateInput,
} from '@ailake/apitype';
import { Box, Button, Flex, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { updateQuery } from '../../../../apis/query';
import { useMutation } from '@tanstack/react-query';
import { Metadata } from './metadata';
import { DetailProvider } from './detail-context';
import { useGenerateStep } from './use-generate-step';

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

  const { generateStep } = useGenerateStep({
    metadata: form.values.metadata,
    onGeneratedChange: (generated) => {
      const currentSteps = form.values.metadata.steps;
      const newSteps: QueryStep[] = currentSteps.map((step, index) => {
        return {
          ...step,
          generatedQuery: generated[index].generatedQuery,
        };
      });
      form.setFieldValue('metadata', {
        ...form.values.metadata,
        steps: newSteps,
      });
    },
  });

  return (
    <form>
      <DetailProvider value={{ generateStep }}>
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
