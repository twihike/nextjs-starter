/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { render } from '@testing-library/react';

import App from './Index';

describe('With React Testing Library', () => {
  it('Shows "Welcome to Next.js starter."', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome to Next.js starter.')).not.toBeNull();
  });
});

describe('With React Testing Library Snapshot', () => {
  it('Should match Snapshot', () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
