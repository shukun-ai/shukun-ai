import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { devTools } from '@ngneat/elf-devtools';

import { App } from './app/app';
devTools();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
