import { createContext, useState } from 'react';

export const ActiveContentCtx = createContext({
  idContent: '',
  title: '',
  fullname: '',
  url: '',
  getIdContent: (id) => {},
  getTitleContent: (title) => {},
  getFullname: (fullname) => {},
  getUrlContent: (url) => {},
});

export const ActiveContentProvider = (props) => {
  const [idContent, setIdContent] = useState('');
  const [title, setTitle] = useState('');
  const [fullname, setFullname] = useState('');
  const [url, setUrl] = useState('');

  const getUrlContent = (url) => {
    setUrl(url);
  };

  const getIdContent = (id) => {
    setIdContent(id);
  };

  const getTitleContent = (title) => {
    setTitle(title);
  };

  const getFullname = (fullname) => {
    setFullname(fullname);
  };

  return (
    <ActiveContentCtx.Provider
      value={{
        idContent,
        title,
        fullname,
        url,
        getUrlContent,
        getIdContent,
        getTitleContent,
        getFullname,
      }}
    >
      {props.children}
    </ActiveContentCtx.Provider>
  );
};
