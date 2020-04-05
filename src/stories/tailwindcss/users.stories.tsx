/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import '../../styles/index.css';

import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

import CommonProviders from '../../components/tailwindcss/CommonProviders';
import Users from '../../components/tailwindcss/pages/Users';
import { authInstances } from '../../lib/auth';
import withApollo from '../../lib/next-with-apollo';

Router.router = {
  push: async () => {},
  prefetch: async () => {},
} as any;
authInstances.default.setToken('dummy');
const Page = withApollo(Users, { useMock: true, setAuthToken: true });

export default { title: 'TailwindCSS Users' };

export const page: NextPage = () => (
  <CommonProviders>
    <Page />
  </CommonProviders>
);
