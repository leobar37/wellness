import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import { theme } from '@wellness/admin-ui';
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </React.Fragment>
  );
}

export default CustomApp;
