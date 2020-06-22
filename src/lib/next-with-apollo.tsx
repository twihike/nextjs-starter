import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';

import { initApolloClient } from './apollo';

export interface WithApolloProps {
  apolloState?: NormalizedCacheObject;
}

export interface WithApolloPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

/* eslint-disable react/jsx-props-no-spreading */
export default function withApollo(
  PageComponent: NextPage,
  {
    clientName = 'default',
    getDataFromTree = false,
    initClient = initApolloClient,
    useMock = false,
    setAuthToken = true,
    authName = 'default',
  } = {},
): NextPage {
  // eslint-disable-next-line react/function-component-definition
  const WithApollo: NextPage<WithApolloProps> = ({
    apolloState,
    ...pageProps
  }) => {
    const client = initClient({
      clientName,
      initialState: apolloState,
      useMock,
      setAuthToken,
      authName,
    });
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      // eslint-disable-next-line no-console
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (getDataFromTree || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (
      ctx: WithApolloPageContext,
    ): Promise<WithApolloProps> => {
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = initApolloClient();
      ctx.apolloClient = apolloClient;

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res?.finished) {
          return pageProps;
        }

        // Only if getDataFromTree is enabled
        if (getDataFromTree) {
          try {
            // Run all GraphQL queries
            const { getMarkupFromTree } = await import('@apollo/react-ssr');
            const { renderToString } = await import('react-dom/server');
            const { AppTree } = ctx;
            await getMarkupFromTree({
              renderFunction: renderToString,
              tree: (
                <AppTree
                  pageProps={{
                    ...pageProps,
                    apolloClient,
                  }}
                />
              ),
            });
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            // eslint-disable-next-line no-console
            console.error('Error while running `getMarkupFromTree`', error);
          }

          // getMarkupFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}
/* eslint-enable react/jsx-props-no-spreading */
