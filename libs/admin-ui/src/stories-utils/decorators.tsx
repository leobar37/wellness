import { ChakraProvider, Container } from '@chakra-ui/react';
import { theme } from '../system';
import { SafeAny } from '@wellness/common';

const ChakraDecorator = (Story: SafeAny) => {
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Story />
      </Container>
    </ChakraProvider>
  );
};

export const decorators = [ChakraDecorator];
