import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@wellness/admin-ui';
import { ApolloProvider } from '@wellness/admin-ui/lib';
import { AppPropsWithLayout } from '@wellness/admin-ui/common';
import { DialogsProvider } from '@wellness/admin-ui/ui';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthProvider } from '@wellness/admin-ui';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { applyYupLocale } from '@wellness/admin-ui/yupLocale';
import { useTitleApi } from '@wellness/admin-ui';
import { SafeAny } from '@wellness/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
applyYupLocale();

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  useTitleApi('App');
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      console.log('redirect');
      router.push('/auth/login');
    }
  }, [router]);

  const Comp: SafeAny = Component as SafeAny;
  return (
    <ApolloProvider pageProps={pageProps}>
      <ChakraProvider theme={theme}>
        <DialogsProvider>
          <AuthProvider>{getLayout(<Comp {...pageProps} />)}</AuthProvider>
        </DialogsProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
