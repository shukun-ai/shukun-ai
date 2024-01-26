import { QueryRetrieveOutput } from '@ailake/apitype';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { retrieveQuery } from '../../../apis/query';
import { ErrorCard, PageSkeleton } from '@ailake/shared-ui';
import { Detail } from './components/detail';
import { useObservableState } from 'observable-hooks';
import { getObservable, dispatch } from './components/detail-repository';
import { DetailProvider } from './components/detail-context';
import { useEffect } from 'react';

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

  const state = useObservableState(getObservable());

  useEffect(() => {
    if (data) {
      dispatch.initQuery(data);
    }

    return () => {
      dispatch.clearQuery();
    };
  }, [data]);

  if (isPending || !data || !state || !state.query) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorCard title={error.name} description={error.message} />;
  }

  return (
    <DetailProvider
      value={{
        ...state,
        ...dispatch,
      }}
    >
      <Detail query={state.query} />
    </DetailProvider>
  );
};
