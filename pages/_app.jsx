import GetIdProvider from '../context/GetId';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <GetIdProvider>
      <Component {...pageProps} />
    </GetIdProvider>
  );
}

export default MyApp;
