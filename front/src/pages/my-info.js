import axios from 'axios';

import Main from '../components/main';
import Seo from '../components/seo';
import { loadMyInfo } from '../redux/actions/user';
import { setPage } from '../redux/reducers/page';
import wrapper from '../redux/store';

const MyInfo = () => {
  return (
    <>
      <Seo title='DCW' />
      <Main>
        내 정보 페이지
      </Main>
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 1. 로그인 상태 확인 및 내 정보 불러오기
  // 현재 브라우저에서 로그인을 하면서 생성된 쿠키가 있는지 확인
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadMyInfo());

  // 2. 로그인 하지 않은 사용자인 경우 home화면으로 이동
  if (!store.getState().user.isLoggedIn) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // 3. 페이지 상태 설정
  store.dispatch(setPage({
    name: 'my-info'
  }));

  return {
    props: {},
  };
});

export default MyInfo;