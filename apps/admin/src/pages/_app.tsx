import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@wellness/admin-ui';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { AppPropsWithLayout } from '@wellness/admin-ui/common';

import 'react-datepicker/dist/react-datepicker.css';

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
