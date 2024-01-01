import { Conversation } from './conversation';
import { ThemeProvider } from './theme-provider';

export type AppProps = {
  //
};

export const App = () => {
  return (
    <ThemeProvider>
      <Conversation />
    </ThemeProvider>
  );
};
