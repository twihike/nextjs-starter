import { CssBaseline } from '@material-ui/core';
import React from 'react';

import { AuthProvider } from '../../lib/auth';
import { DarkModeProvider } from '../../lib/mui';

import MyThemeProvider from './MyThemeProvider';

function CommonProviders({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <DarkModeProvider>
      <MyThemeProvider>
        <AuthProvider>
          <CssBaseline />
          {children}
        </AuthProvider>
      </MyThemeProvider>
    </DarkModeProvider>
  );
}

export default CommonProviders;
