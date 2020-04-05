/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

import CommonHead from '../../components/mui/CommonHead';
import CommonProviders from '../../components/mui/CommonProviders';
import Index from '../../components/mui/pages/Index';

Router.router = {
  push: async () => {},
  prefetch: async () => {},
} as any;

export default { title: 'Mui Index' };

export const page: NextPage = () => (
  <CommonHead>
    <CommonProviders>
      <Index />
    </CommonProviders>
  </CommonHead>
);
