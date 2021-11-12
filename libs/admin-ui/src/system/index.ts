import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: '#22FF02',
    brown: {
      300: '#212121',
      500: '#212121',
    },
  },
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    mono: 'Menlo, monospace',
  },
});
