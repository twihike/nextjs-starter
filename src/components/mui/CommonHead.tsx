import Head from 'next/head';
import React from 'react';

function CommonHead({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <Head>
        <title>Next.js starter</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="description" content="Next.js starter" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      {children}
    </>
  );
}

export default CommonHead;
