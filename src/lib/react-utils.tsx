/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

export function createStateContext<V>(
  defaultValue: V,
): [
  React.Context<[V, React.Dispatch<React.SetStateAction<V>>]>,
  (props: React.PropsWithChildren<{}>) => React.ReactElement,
] {
  type SetState = React.Dispatch<React.SetStateAction<V>>;
  const defaultSetState: SetState = () => defaultValue;
  const Context = React.createContext([defaultValue, defaultSetState] as [
    typeof defaultValue,
    typeof defaultSetState,
  ]);

  const Provider = (props: React.PropsWithChildren<{}>): React.ReactElement => {
    const [state, setState] = React.useState(defaultValue);
    return <Context.Provider value={[state, setState]} {...props} />;
  };

  return [Context, Provider] as [typeof Context, typeof Provider];
}
