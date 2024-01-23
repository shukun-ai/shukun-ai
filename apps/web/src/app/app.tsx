import { ThemeProvider } from './theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { queryClient } from './query-client';
import './i18n';

export type AppProps = {
  //
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <Notifications position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
