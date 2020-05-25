import { AppProps } from 'next/app';
import React from 'react';

import CommonHead from './CommonHead';
import CommonProviders from './CommonProviders';

/* eslint-disable react/jsx-props-no-spreading */
function TailwindApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <CommonHead>
      <CommonProviders>
        <Component {...pageProps} />
      </CommonProviders>
    </CommonHead>
  );
}
/* eslint-enable react/jsx-props-no-spreading */

export default TailwindApp;
