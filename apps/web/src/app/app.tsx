import { ThemeProvider } from './theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { queryClient } from './query-client';
import './i18n';
import { ModalsProvider } from '@mantine/modals';
import { DndProvider } from '@ailake/shared-ui';

export type AppProps = {
  //
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DndProvider>
          <ModalsProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </ModalsProvider>
          <Notifications position="top-right" />
        </DndProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
