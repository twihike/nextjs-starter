// https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript

import { EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import React from 'react';

import CommonHead from './CommonHead';
import CommonProviders from './CommonProviders';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

/* eslint-disable react/jsx-props-no-spreading */
export default function MuiApp(props: MyAppProps): React.ReactElement {
  const { Component, emotionCache, pageProps } = props;

  return (
    <CommonHead>
      <CommonProviders emotionCache={emotionCache}>
        <Component {...pageProps} />
      </CommonProviders>
    </CommonHead>
  );
}
/* eslint-enable react/jsx-props-no-spreading */
