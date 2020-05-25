import '../../styles/index.css';

import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

import CommonHead from '../../components/tailwindcss/CommonHead';
import CommonProviders from '../../components/tailwindcss/CommonProviders';
import Users from '../../components/tailwindcss/pages/Users';
import { authInstances } from '../../lib/auth';
import withApollo from '../../lib/next-with-apollo';

Router.router = {
  /* eslint-disable @typescript-eslint/no-empty-function */
  prefetch: async () => {},
  push: async () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
} as never;
authInstances.default.setToken('dummy');
const Page = withApollo(Users, { useMock: true, setAuthToken: true });

export default { title: 'TailwindCSS Users' };

// eslint-disable-next-line react/function-component-definition
export const page: NextPage = () => (
  <CommonHead>
    <CommonProviders>
      <Page />
    </CommonProviders>
  </CommonHead>
);
