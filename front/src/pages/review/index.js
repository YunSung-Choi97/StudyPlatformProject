import axios from 'axios';

import FunctionalPart from '../../components/functional_part';
import Main from '../../components/main';
import Posts from '../../components/posts';
import Seo from '../../components/seo';
import { loadPosts } from '../../redux/actions/posts';
import { loadMyInfo } from '../../redux/actions/user';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Review = () => {
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
    name: 'posts',
    category: 'review',
    search: context.query.search ? context.query.search : null,
    page: context.query.page ? Number(context.query.page) : null
  }));

  // 3. 데이터 불러오기
  await store.dispatch(loadPosts(store.getState().page));
  if (parseInt((store.getState().post.posts_length - 1) / 10) + 1 < store.getState().page.page) {
    return {
      redirect: {
        destination: '/review',
        permanent: false
      }
    }
  }

  return {
    props: {},
  };
});

export default Review;