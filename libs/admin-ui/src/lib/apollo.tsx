import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from 'apollo-link-error';
import merge from 'deepmerge';
import { IncomingHttpHeaders } from 'http';
import { isEqual } from 'lodash';
import { AppProps } from 'next/app';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { isServer } from '../utils';

const APOLLO_PROP_NAME = '__APOLLO__STATE';

// authorization

const authLink = setContext((_, { headers }) => {
  /**
   * TODO:
   * - The "token" should be a constant
   */
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * see: https://www.npmjs.com/package/apollo-link-error
 */
const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
}) as unknown as ApolloLink;

const httpLink = new HttpLink({
  uri: 'http://localhost:3500/graphql',
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
  }, []);

  if (!hasMounted) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
