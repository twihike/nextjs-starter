import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class TailwindDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default TailwindDocument;
