import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { devTools } from '@ngneat/elf-devtools';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { App } from './app/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

devTools();

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
