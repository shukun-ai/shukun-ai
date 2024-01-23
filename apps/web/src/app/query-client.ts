import { notifications } from '@mantine/notifications';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      notifications.show({
        color: 'red',
        title: error.name,
        message: error.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      notifications.show({
        color: 'red',
        title: error.name,
        message: error.message,
      });
    },
  }),
});
