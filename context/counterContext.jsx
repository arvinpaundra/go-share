import { createContext, useState } from 'react';

export const CounterContext = createContext({
  updatePointCounter: true,
  updaterCounter: (status) => {},
});

export const CounterProvider = (props) => {
  const [updatePointCounter, setUpdatePointCounter] = useState(true);

  const updaterCounter = (status) => {
    setUpdatePointCounter(status);
  };

  return (
    <CounterContext.Provider
      value={{
        updatePointCounter,
        updaterCounter,
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};
