import axios from 'axios';

import Main from '../../components/main';
import Seo from '../../components/seo';
import FunctionalPart from '../../components/functional_part';
import wrapper from '../../redux/store';
import { loadMyInfo } from '../../redux/actions/user';
import { setPage } from '../../redux/reducers/page';

const Study = () => {
  // setPageState('find-member', 'study');

  return (
    <>
      <Seo title='DCW' />
      <Main>
        <FunctionalPart />
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
  const status = context.query.status ? context.query.status : '전체';
  store.dispatch(setPage({
    category: 'find-member',
    section: 'study',
    status
  }));

  return {
    props: {},
  };
});

export default Study;