import { MantineProvider, rem } from '@mantine/core';

export type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'light',
        headings: {
          sizes: {
            h1: { fontSize: rem(28), lineHeight: '1.3' },
            h2: { fontSize: rem(22), lineHeight: '1.35' },
            h3: { fontSize: rem(20), lineHeight: '1.4' },
            h4: { fontSize: rem(16), lineHeight: '1.45' },
            h5: { fontSize: rem(14), lineHeight: '1.5' },
            h6: { fontSize: rem(12), lineHeight: '1.5' },
          },
        },
        colors: {
          blue: [
            '#DDF1FF',
            '#F4FAFF',
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
        defaultRadius: 0,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  );
};
