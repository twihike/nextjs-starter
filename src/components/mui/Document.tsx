// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
/* eslint-disable react/jsx-props-no-spreading */

import { NextComponentType } from 'next';
import { AppInitialProps } from 'next/app';
import {
  AppContextType,
  AppPropsType,
  RenderPageResult,
} from 'next/dist/next-server/lib/utils';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { NextRouter } from 'next/router';
import React from 'react';

import { ServerStyleSheets } from '@material-ui/core/styles';

class MuiDocument extends Document {
  render(): React.ReactElement {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MuiDocument.getInitialProps = async (
  ctx: DocumentContext,
): Promise<DocumentInitialProps> => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> => {
    return originalRenderPage({
      enhanceApp: (
        App: NextComponentType<
          AppContextType<NextRouter>,
          AppInitialProps,
          AppPropsType<NextRouter, {}>
        >,
      ) => (
        props: React.PropsWithChildren<AppPropsType<NextRouter, {}>>,
      ): React.ReactElement => sheets.collect(<App {...props} />),
    });
  };
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MuiDocument;
