import { QueryRetrieveOutput } from '@ailake/apitype';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { retrieveQuery } from '../../../apis/query';
import { ErrorCard, PageSkeleton } from '@ailake/shared-ui';
import { Detail } from './components/detail';

export type QueriesDetailProps = {
  //
};

export const QueriesDetail = () => {
  const { queryId } = useParams();

  const { isPending, error, data } = useQuery<QueryRetrieveOutput | undefined>({
    queryKey: ['retrieveQuery', queryId],
    queryFn: async () => {
      if (queryId) {
        return await retrieveQuery({
          queryId,
        });
      }
    },
  });

  if (isPending || !data) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorCard title={error.name} description={error.message} />;
  }

  return <Detail query={data} />;
};
