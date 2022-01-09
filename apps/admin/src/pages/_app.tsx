import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@wellness/admin-ui';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@wellness/admin-ui/lib';
import { AppPropsWithLayout } from '@wellness/admin-ui/common';
import { DialogsProvider } from '@wellness/admin-ui/ui';
import 'react-datepicker/dist/react-datepicker.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <DialogsProvider>
          {getLayout(<Component {...pageProps} />)}
        </DialogsProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
