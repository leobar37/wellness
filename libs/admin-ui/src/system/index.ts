import { extendTheme } from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/react';
const Button = {
  // Styles for the base style
  baseStyle: {} as SystemStyleObject,
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    solid: {
      bg: 'brown.500',
      color: 'white',
      _hover: {
        bg: 'brown.500',
        color: 'white',
        transform: 'scale(1.08)',
      },
      _active: {
        transform: 'scale(0.9)',
      },
    } as SystemStyleObject,
  },
  // The default `size` or `variant` values
  defaultProps: {},
};

const Form = {
  baseStyle: {
    container: {
      my: '4',
    } as SystemStyleObject,
  },
};

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
  components: {
    Button,
    Form,
  },
});
