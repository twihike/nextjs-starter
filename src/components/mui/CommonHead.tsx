import Head from 'next/head';
import React from 'react';

const CommonHead = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Next.js starter</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {children}
    </>
  );
};

export default CommonHead;
