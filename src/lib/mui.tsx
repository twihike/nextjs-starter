/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { useMediaQuery } from '@material-ui/core';

import { createStateContext } from './react-utils';

const [DarkModeContext, DarkModeInnerProvider] = createStateContext({
  isDarkMode: false,
  auto: true,
});
export { DarkModeContext };

export const DarkModeProvider = (
  props: React.PropsWithChildren<{}>,
): React.ReactElement => {
  const DarkModeConsumer = (
    consumerProps: React.PropsWithChildren<{}>,
  ): React.ReactElement => {
    if (typeof window !== 'undefined') {
      const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
      const [darkMode, setDarkMode] = React.useContext(DarkModeContext);

      React.useMemo(() => {
        if (!darkMode.auto) {
          return;
        }
        setDarkMode({ ...darkMode, isDarkMode: prefersDarkMode });
      }, [prefersDarkMode]);
    }

    return <React.Fragment {...consumerProps} />;
  };

  return (
    <DarkModeInnerProvider>
      <DarkModeConsumer {...props} />
    </DarkModeInnerProvider>
  );
};
