/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

import CommonHead from '../../components/mui/CommonHead';
import CommonProviders from '../../components/mui/CommonProviders';
import Users from '../../components/mui/pages/Users';
import { authInstances } from '../../lib/auth';
import withApollo from '../../lib/next-with-apollo';

Router.router = {
  push: async () => {},
  prefetch: async () => {},
} as any;
authInstances.default.setToken('dummy');
const Page = withApollo(Users, { useMock: true, setAuthToken: true });

export default { title: 'Mui Users' };

export const page: NextPage = () => (
  <CommonHead>
    <CommonProviders>
      <Page />
    </CommonProviders>
  </CommonHead>
);
