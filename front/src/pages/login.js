import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/main';
import Seo from '../components/seo';
import { loadMyInfo, login } from '../redux/actions/user';
import { setPage } from '../redux/reducers/page';
import wrapper from '../redux/store';
import styles from '../styles/login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loginErrorMessage } = useSelector((state) => state.user);
  const router = useRouter();

  // 로그인 요청
  const login_handler = useCallback((event) => {
    event.preventDefault();
    dispatch(login({
      inputId: event.target.inputId.value,
      inputPassword: event.target.inputPassword.value
    }));
  }, []);

  // 로그인 성공
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn]);

  // 로그인 실패
  useEffect(() => {
    if (loginErrorMessage) {
      alert(loginErrorMessage);
    }
  }, [loginErrorMessage]);

  return (
    <>
      <Seo title='DCW' />
      <Main>
        <form className={styles.container} onSubmit={login_handler}>
          <div className={styles.login_wrap}>
            <div className={styles.id_box}>
              <input type='text' name='inputId' placeholder='아이디' required />
            </div>
            <div className={styles.pwd_box}>
              <input type='password' name='inputPassword' placeholder='비밀번호' required />
            </div>
          </div>
          <button type='submit'>로그인</button>
        </form>
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
    category: 'login'
  }));

  return {
    props: {},
  };
});

export default Login;