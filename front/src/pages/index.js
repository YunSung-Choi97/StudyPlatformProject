import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux'

function Index() {
  const dispatch = useDispatch();
  const _user = useSelector(state => state.user);
  console.log(_user);
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>DCW project</title>
      </Head>
      <div>

      </div>
    </>
  );
};

export default Index;