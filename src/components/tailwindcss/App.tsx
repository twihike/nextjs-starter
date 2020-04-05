/* eslint-disable react/jsx-props-no-spreading */

import { AppProps } from 'next/app';
import React from 'react';

import CommonProviders from './CommonProviders';

function TailwindApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <CommonProviders>
      <Component {...pageProps} />
    </CommonProviders>
  );
}

export default TailwindApp;
