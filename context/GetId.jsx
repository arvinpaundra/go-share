import { createContext, useState } from 'react';

export const GetIdContext = createContext({
  getId: '',
  onGetId: () => {},
});

const GetIdProvider = (props) => {
  const [getId, setGetId] = useState('');

  const onGetId = (id) => {
    setGetId(id);
  };

  return (
    <GetIdContext.Provider
      value={{
        getId,
        onGetId,
      }}
    >
      {props.children}
    </GetIdContext.Provider>
  );
};

export default GetIdProvider;
