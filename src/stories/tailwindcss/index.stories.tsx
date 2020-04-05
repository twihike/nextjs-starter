/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import '../../styles/index.css';
import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

import CommonProviders from '../../components/tailwindcss/CommonProviders';
import Index from '../../components/tailwindcss/pages/Index';

Router.router = {
  push: async () => {},
  prefetch: async () => {},
} as any;

export default { title: 'TailwindCSS Index' };

export const page: NextPage = () => (
  <CommonProviders>
    <Index />
  </CommonProviders>
);
