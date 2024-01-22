import { TemplateRetrieveOutput } from '@ailake/apitype';
import { useQuery } from '@tanstack/react-query';
import { retrieveTemplate } from '../../../apis/template';
import { useParams } from 'react-router-dom';
import { Box, Skeleton } from '@mantine/core';
import { Detail } from './components/detail';

export type TemplatesDetailProps = {
  //
};

export const TemplatesDetail = () => {
  const { templateId } = useParams();

  const { isPending, error, data } = useQuery<
    TemplateRetrieveOutput | undefined
  >({
    queryKey: ['retrieveTemplate', templateId],
    queryFn: async ({ queryKey }) => {
      if (templateId) {
        return await retrieveTemplate({
          templateId,
        });
      }
    },
  });

  if (isPending)
    return (
      <>
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </>
    );

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return 'No data';

  return (
    <Box>
      <Detail template={data} />
    </Box>
  );
};
