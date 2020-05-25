/* eslint-disable react/jsx-props-no-spreading */

import { AppProps } from 'next/app';
import React from 'react';

import CommonHead from './CommonHead';
import CommonProviders from './CommonProviders';

function TailwindApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <CommonHead>
    <CommonProviders>
      <Component {...pageProps} />
    </CommonProviders>
    </CommonHead>
  );
}

export default TailwindApp;
