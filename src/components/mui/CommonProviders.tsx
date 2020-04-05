import React from 'react';

import { CssBaseline } from '@material-ui/core';

import { AuthProvider } from '../../lib/auth';
import { DarkModeProvider } from '../../lib/mui';
import MyThemeProvider from './MyThemeProvider';

const CommonProviders = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
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
};

export default CommonProviders;
