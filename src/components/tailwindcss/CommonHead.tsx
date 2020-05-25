import Head from 'next/head';
import React from 'react';

function CommonHead({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <Head>
        <title>Next.js startera</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Next.js starter" />
      </Head>
      {children}
    </>
  );
}

export default CommonHead;
