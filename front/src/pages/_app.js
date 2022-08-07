import Footer from '../components/footer';
import Header from '../components/header/header';
import wrapper from '../redux/store';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default wrapper.withRedux(App);