import { TemplateRetrieveOutput } from '@ailake/apitype';
import { useQuery } from '@tanstack/react-query';
import { retrieveTemplate } from '../../../apis/template';
import { useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
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

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return 'No data';

  return (
    <Box>
      <Detail template={data} />
    </Box>
  );
};
