// https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import App from 'next/app';
import React from 'react';

import CommonHead from './CommonHead';
import CommonProviders from './CommonProviders';

/* eslint-disable react/jsx-props-no-spreading */
class MuiApp extends App {
  componentDidMount(): void {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      // eslint-disable-next-line unicorn/prefer-node-remove
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render(): React.ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <CommonHead>
        <CommonProviders>
          <Component {...pageProps} />
        </CommonProviders>
      </CommonHead>
    );
  }
}
/* eslint-enable react/jsx-props-no-spreading */

export default MuiApp;

// const didMountRef = React.useRef(false);
// React.useLayoutEffect(() => {
//   if (!didMountRef.current) {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector('#jss-server-side');
//     if (jssStyles?.parentElement) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//     didMountRef.current = true;
//   }
// });
