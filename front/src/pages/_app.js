import Header from '../components/header';
import wrapper from '../redux/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);