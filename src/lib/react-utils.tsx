import React from 'react';

export function createStateContext<V>(
  defaultValue: V,
): [
  React.Context<[V, React.Dispatch<React.SetStateAction<V>>]>,
  (props: { children?: React.ReactNode }) => React.ReactElement,
] {
  type SetState = React.Dispatch<React.SetStateAction<V>>;
  const defaultSetState: SetState = () => defaultValue;
  const Context = React.createContext([defaultValue, defaultSetState] as [
    typeof defaultValue,
    typeof defaultSetState,
  ]);

  function Provider(props: { children?: React.ReactNode }): React.ReactElement {
    const [state, setState] = React.useState(defaultValue);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Context.Provider value={[state, setState]} {...props} />;
  }

  return [Context, Provider] as [typeof Context, typeof Provider];
}
