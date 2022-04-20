import { extendTheme } from '@chakra-ui/react';
import { theme as chakraTheme } from '@chakra-ui/theme';
import { StyleConfig, SystemStyleObject } from '@chakra-ui/theme-tools';
const Button: StyleConfig = {
  // Styles for the base style
  baseStyle: {} as SystemStyleObject,
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    solid: {
      color: 'white',
      _hover: {
        color: 'white',
        transform: 'scale(1.04)',
      },
      _active: {
        transform: 'scale(0.9)',
      },
    } as SystemStyleObject,
    red: {
      bg: 'red.500',
      color: 'white',
    },
  },

  defaultProps: {
    colorScheme: 'brown2',
  },
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
    brown2: {
      50: '#f8f0f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#1E1E1E',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#1E1E1E',
    },
    panda: {
      50: '#f8f1f0',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#120b0c',
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
