import { QueryListOutput } from '@ailake/apitype';
import { useQuery } from '@tanstack/react-query';
import { listQuery } from '../../../apis/query';
import { ErrorCard, ItemCard, PageSkeleton } from '@ailake/shared-ui';
import { Avatar, Box, Grid } from '@mantine/core';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CreateButton } from './components/create-button';
import { ListMenu } from './components/list-menu';

export type QueriesListProps = {
  //
};

export const QueriesList = () => {
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery<QueryListOutput | undefined>({
    queryKey: ['listQuery'],
    queryFn: async () => {
      return await listQuery({});
    },
  });

  if (isPending || !data) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorCard title={error.name} description={error.message} />;
  }

  return (
    <Box>
      <Grid>
        <Grid.Col span={3}>
          <CreateButton />
        </Grid.Col>
        {data.map((item) => (
          <Grid.Col span={3}>
            <ItemCard
              icon={<Avatar color="#0D74CE">Q</Avatar>}
              title={item.name}
              text={format(new Date(item.createdAt), 'yyyy-MM-dd')}
              onClick={() => {
                navigate(`/queries/${item.queryId}`);
              }}
              menu={<ListMenu query={item} />}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
