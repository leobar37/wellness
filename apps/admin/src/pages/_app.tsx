import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@wellness/admin-ui';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@wellness/admin-ui/lib';
import { AppPropsWithLayout } from '@wellness/admin-ui/common';
import { DialogsProvider } from '@wellness/admin-ui/ui';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthProvider } from '@wellness/admin-ui';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { applyYupLocale } from '@wellness/admin-ui/yupLocale';
import { useTitleApi } from '@wellness/admin-ui';
applyYupLocale();

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);
  useTitleApi('App');

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <DialogsProvider>
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </DialogsProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
