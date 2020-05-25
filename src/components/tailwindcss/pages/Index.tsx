import React from 'react';

import Layout from '../Layout';

function Index(): React.ReactElement {
  return (
    <Layout>
      <div className="p-2">
        <p className="text-4xl text-on-surface">Welcome to Next.js starter.</p>
        <button
          type="button"
          className="tk-button tk-button-contained tk-button-ripple"
        >
          Contained button
        </button>

        <div className="bg-surface">
          <p className="text-on-surface">
            <span>text-on-surface</span>
          </p>
          <p className="text-on-surface-light">
            <span>text-on-surface-light</span>
          </p>
          <p className="text-on-surface-dark">
            <span>text-on-surface-dark</span>
          </p>
          <p className="text-on-surface-text-high-emphasis">
            <span>text-on-surface-text-high-emphasis</span>
          </p>
          <p className="text-on-surface-text-medium-emphasis">
            <span>text-on-surface-text-medium-emphasis</span>
          </p>
          <p className="text-on-surface-text-disabled">
            <span>text-on-surface-text-disabled</span>
          </p>
        </div>

        <div className="bg-background">
          <p className="text-on-background">
            <span>text-on-background</span>
          </p>
          <p className="text-on-background-text-high-emphasis">
            <span>text-on-background-text-high-emphasis</span>
          </p>
          <p className="text-on-background-text-medium-emphasis">
            <span>text-on-background-text-medium-emphasis</span>
          </p>
          <p className="text-on-background-text-disabled">
            <span>text-on-background-text-disabled</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
