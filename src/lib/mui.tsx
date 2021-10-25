import { useMediaQuery } from '@mui/material';
import React from 'react';

import { createStateContext } from './react-utils';

const [DarkModeContext, DarkModeInnerProvider] = createStateContext({
  isDarkMode: false,
  auto: true,
});
export { DarkModeContext };

export function DarkModeProvider(props: {
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <DarkModeInnerProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DarkModeConsumer {...props} />
    </DarkModeInnerProvider>
  );
}

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

  // eslint-disable-next-line react/jsx-no-useless-fragment, react/jsx-props-no-spreading
  return <React.Fragment {...consumerProps} />;
}
