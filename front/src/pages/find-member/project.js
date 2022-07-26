import axios from 'axios';

import Main from '../../components/main';
import Seo from '../../components/seo';
import { loadMyInfo } from '../../redux/actions/user';
import wrapper from '../../redux/store';

const Project = () => {
  return (
    <>
      <Seo title='DCW' />
      <Main>
        프로젝트 페이지
      </Main>
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 현재 브라우저에서 로그인을 하면서 생성된 쿠키가 있는지 확인
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  await store.dispatch(loadMyInfo());

  return {
    props: {},
  };
});

export default Project;