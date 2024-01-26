import { QueryRetrieveOutput, QueryUpdateInput } from '@ailake/apitype';
import { Box, Button, Flex, Title } from '@mantine/core';
import { updateQuery } from '../../../../apis/query';
import { useMutation } from '@tanstack/react-query';
import { Metadata } from './metadata';
import { useDetailContext } from './detail-context';
import { notifications } from '@mantine/notifications';

export type DetailProps = {
  query: QueryRetrieveOutput;
};

export const Detail = ({ query }: DetailProps) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: QueryUpdateInput) => {
      return updateQuery(props);
    },
  });

  const { setMetadata, generatedStepIndex } = useDetailContext();

  return (
    <form>
      <Box>
        <Flex justify="space-between">
          <Box>
            <Title order={3}>Query Configuration</Title>
            <Title order={6} mb="md">
              {query.name}
            </Title>
          </Box>
          <Button
            loading={isPending}
            onClick={async () => {
              if (generatedStepIndex !== query.metadata.steps.length - 1) {
                notifications.show({
                  title: 'Please generate all steps before saving.',
                  message:
                    'Please generate all steps before you save them. If you would not like to generate all steps, you can delete them.',
                  color: 'red',
                  autoClose: 5000,
                });
                return;
              }
              await mutateAsync(query);
            }}
          >
            Save
          </Button>
        </Flex>
      </Box>

      <Metadata
        value={query.metadata}
        onChange={(metadata) => {
          setMetadata(metadata);
        }}
      />
    </form>
  );
};
