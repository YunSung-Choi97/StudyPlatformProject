import axios from 'axios';

import FunctionalPart from '../../components/functional_part';
import Main from '../../components/main';
import Posts from '../../components/posts';
import Seo from '../../components/seo';
import { loadPosts } from '../../redux/actions/post';
import { loadMyInfo } from '../../redux/actions/user';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Recruitment = () => {
  return (
    <>
      <Seo title='DCW' />
      <Main>
        <FunctionalPart />
        <Posts />
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
    category: 'recruitment'
  }));

  // 3. 데이터 불러오기
  await store.dispatch(loadPosts({
    category: 'recruitment',
    section: null,
    status: null
  }));

  return {
    props: {},
  };
});

export default Recruitment;