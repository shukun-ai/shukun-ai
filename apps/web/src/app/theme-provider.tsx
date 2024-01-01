import { MantineProvider } from '@mantine/core';

export type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        colors: {
          blue: [
            '#F4FAFF',
            '#DDF1FF',
            '#ADDBFF',
            '#6FB6FF',
            '#3990FF',
            '#096BDE',
            '#054DA7',
            '#02367D',
            '#072859',
            '#00153C',
          ],
        },
        defaultRadius: 3,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  );
};
