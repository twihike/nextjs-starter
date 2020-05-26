import { useMediaQuery } from '@material-ui/core';
import React from 'react';

import { createStateContext } from './react-utils';

const [DarkModeContext, DarkModeInnerProvider] = createStateContext({
  isDarkMode: false,
  auto: true,
});
export { DarkModeContext };

/* eslint-disable react/jsx-props-no-spreading */
export function DarkModeProvider(props: {
  children?: React.ReactNode;
}): React.ReactElement {
  function DarkModeConsumer(consumerProps: {
    children?: React.ReactNode;
  }): React.ReactElement {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = React.useContext(DarkModeContext);

    React.useMemo(() => {
      if (
        !darkMode.auto ||
        darkMode.isDarkMode === prefersDarkMode ||
        typeof window === 'undefined'
      ) {
        return;
      }
      setDarkMode({ ...darkMode, isDarkMode: prefersDarkMode });
    }, [darkMode, prefersDarkMode, setDarkMode]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment {...consumerProps} />;
  }

  return (
    <DarkModeInnerProvider>
      <DarkModeConsumer {...props} />
    </DarkModeInnerProvider>
  );
}
/* eslint-enable react/jsx-props-no-spreading */
