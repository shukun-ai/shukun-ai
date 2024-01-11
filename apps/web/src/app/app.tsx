import { ThemeProvider } from './theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import './i18n';

export type AppProps = {
  //
};

export const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};
