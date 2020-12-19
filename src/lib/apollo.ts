import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/link-context';
import fetch from 'isomorphic-unfetch';

import { authInstances } from './auth';

const URL_SSR = 'http://localhost:3000/graphql';
const URL_CSR = 'http://localhost:3000/graphql';

export const clientInstances: {
  [key: string]: ApolloClient<NormalizedCacheObject>;
} = {};

export function initApolloClient({
  clientName = 'default',
  initialState = {},
  useMock = false,
  setAuthToken = false,
  authName = 'default',
} = {}): ApolloClient<NormalizedCacheObject> {
  if (typeof window === 'undefined') {
    const client = createApolloClient({ initialState, useMock });
    return client;
  }

  if (!(clientName in clientInstances)) {
    clientInstances[clientName] = createApolloClient({
      initialState,
      useMock,
      setAuthToken,
      authName,
    });
  }

  return clientInstances[clientName];
}

export function createApolloClient({
  initialState = {},
  useMock = false,
  setAuthToken = false,
  authName = 'default',
} = {}): ApolloClient<NormalizedCacheObject> {
  const cache = new InMemoryCache().restore(initialState);

  let link: ApolloLink;
  if (useMock) {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    link = require('./apollo-mock').createMockLink();
  } else if (setAuthToken) {
    link = createAuthLink({ authName }).concat(createIsomorphLink());
  } else {
    link = createIsomorphLink();
  }

  return new ApolloClient({
    cache,
    link,
    ssrMode: typeof window === 'undefined',
  });
}

export function createIsomorphLink(): ApolloLink {
  const uri = typeof window === 'undefined' ? URL_SSR : URL_CSR;

  return new HttpLink({
    uri,
    credentials: 'same-origin',
    fetch,
  });
}

export function createAuthLink({ authName = 'default' } = {}): ApolloLink {
  const authLink = setContext((_, { headers }) => {
    const token = authInstances[authName].getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  return authLink;
}
