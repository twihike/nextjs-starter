import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';

import { AuthProvider } from '../../lib/auth';
import { DarkModeProvider } from '../../lib/mui';

import MyThemeProvider from './MyThemeProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: 'css' });

function CommonProviders({
  emotionCache = clientSideEmotionCache,
  children,
}: {
  emotionCache?: EmotionCache;
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <CacheProvider value={emotionCache}>
      <DarkModeProvider>
        <MyThemeProvider>
          <AuthProvider>
            <CssBaseline />
            {children}
          </AuthProvider>
        </MyThemeProvider>
      </DarkModeProvider>
    </CacheProvider>
  );
}

export default CommonProviders;
