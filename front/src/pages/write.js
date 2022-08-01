import Main from '../components/main';
import Seo from '../components/seo';
import { setPage } from '../redux/reducers/page';

const Write = () => {
  return (
    <>
      <Seo title='DCW' />
      <Main>
        글쓰기 페이지
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

  // 2. 페이지 상태 설정
  store.dispatch(setPage({
    category: 'write'
  }));

  return {
    props: {},
  };
});

export default Write;