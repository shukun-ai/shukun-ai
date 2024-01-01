import { MantineProvider } from '@mantine/core';

export type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  );
};
