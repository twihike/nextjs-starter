import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

import { DarkModeContext } from '../../lib/mui';

function MyThemeProvider(props: {
  children: React.ReactNode;
}): React.ReactElement {
  const [darkMode] = React.useContext(DarkModeContext);
  const theme = React.useMemo(() => {
    const themeProps: ThemeOptions = {
      palette: {
        mode: darkMode.isDarkMode ? 'dark' : 'light',
        primary: {
          main: darkMode.isDarkMode ? blue[200] : blue[800],
        },
      },
    };
    if (darkMode.isDarkMode && themeProps.palette) {
      themeProps.palette.background = {
        default: '#202020',
        paper: '#303030',
      };
    }
    return createTheme(themeProps);
  }, [darkMode]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ThemeProvider theme={theme} {...props} />;
}

export default MyThemeProvider;
