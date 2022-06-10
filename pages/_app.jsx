import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ActiveContentProvider } from '../context/getActiveContent';
import { CounterProvider } from '../context/counterContext';

function MyApp({ Component, pageProps }) {
  return (
    <ActiveContentProvider>
      <CounterProvider>
        <Component {...pageProps} />
        <ToastContainer theme="colored" autoClose={3000} />
      </CounterProvider>
    </ActiveContentProvider>
  );
}

export default MyApp;
