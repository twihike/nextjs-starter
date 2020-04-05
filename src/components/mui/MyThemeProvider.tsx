/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import { DarkModeContext } from '../../lib/mui';

const MyThemeProvider = (
  props: Required<React.PropsWithChildren<{}>>,
): React.ReactElement => {
  const [darkMode] = React.useContext(DarkModeContext);
  const theme = React.useMemo(() => {
    const themeProps: ThemeOptions = {
      palette: {
        type: darkMode.isDarkMode ? 'dark' : 'light',
        primary: blue,
      },
    };
    if (darkMode.isDarkMode) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      themeProps.palette!.background = {
        default: '#202020',
      };
    }
    return createMuiTheme(themeProps);
  }, [darkMode]);

  return <ThemeProvider theme={theme} {...props} />;
};

export default MyThemeProvider;
