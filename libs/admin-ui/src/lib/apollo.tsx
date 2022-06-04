import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider as LocalApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from 'apollo-link-error';
import merge from 'deepmerge';
import { IncomingHttpHeaders } from 'http';
import { isEqual } from 'lodash';
import { AppProps } from 'next/app';
import {
  FC,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isServer } from '../utils';
import { isDev } from '@wellness/common';
import { useDialogs } from '../ui/dialogs';
import nodeFetch from 'node-fetch';
const APOLLO_PROP_NAME = '__APOLLO__STATE';

// authorization

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const { setErrorState } = useDialogs.getState();
const linkError = onError(
  ({ operation, graphQLErrors, networkError, response }) => {
    const ignoreErrors = () => {
      if (response?.errors) {
        delete response.errors;
      }
    };
    if (graphQLErrors) {
      const [firtError] = graphQLErrors.slice(0, 1);
      if (firtError) {
        const CODE = firtError.extensions?.code;
        switch (CODE) {
          case 'BUSINESS_ERROR': {
            const message = firtError.message;
            setErrorState((state) => {
              state.info.description = message;
              state.info.title = 'Error';
              state.isOpen = true;
            });
            return;
          }
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
) as unknown as ApolloLink;

const httpLink = new HttpLink({
  uri: isDev
    ? 'http://localhost:3500/graphql'
    : 'https://api.wellnesspro24.com/graphql',
});

export const createApolloClient = (
  headers: IncomingHttpHeaders | null = null
) => {
  return new ApolloClient({
    ssrMode: isServer,
    // https://www.apollographql.com/docs/react/api/link/introduction/
    link: ApolloLink.from([authLink, linkError, httpLink]),
    cache: new InMemoryCache({}),
  });
};

type InitialState = NormalizedCacheObject | undefined;

interface InitialStateApollo {
  headers?: IncomingHttpHeaders | null;
  initialState: InitialState;
}

export const inializeApollo = ({
  headers,
  initialState,
}: InitialStateApollo) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  if (initialState && apolloClient) {
    const existingCache = apolloClient.extract();
    const data = merge(initialState, existingCache, {
      arrayMerge: (target, source) => {
        return [
          ...source,
          ...target.filter((d) => source.every((s) => !isEqual(d, s))),
        ];
      },
    });
    //restore the cache with the merge data
    _apolloClient.cache.restore(data);
  }

  // for ssg and ssr always create a new apollo Client
  if (isServer) return _apolloClient;

  // create the apollo client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return apolloClient;
};

/**
 * @description Use this function for add the state
 * of apollo , that can be used  as initial state in the client
 */
export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_PROP_NAME];
  const store = useMemo(() => inializeApollo({ initialState: state }), [state]);
  return store;
}

export function ClientOnly({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
PropsWithChildren<{}>) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    //  a
  }, []);

  if (!hasMounted) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

// add apollo provider

export const ApolloProvider: FC<{
  pageProps: SVGAElement;
  children: ReactElement;
}> = ({ pageProps, children }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <LocalApolloProvider client={apolloClient}>{children}</LocalApolloProvider>
  );
};
