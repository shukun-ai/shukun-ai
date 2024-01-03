import { Conversation } from './conversation/conversation';
import { ThemeProvider } from './theme-provider';
import { DefaultLayout } from './layouts/default-layout';
export type AppProps = {
  //
};

export const App = () => {
  return (
    <ThemeProvider>
      <DefaultLayout>
        <Conversation />
      </DefaultLayout>
    </ThemeProvider>
  );
};
