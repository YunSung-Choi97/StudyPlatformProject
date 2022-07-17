import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/main';
import Seo from '../components/seo';
import { login } from '../redux/actions/user';
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

  // 로그인 성공시 홈화면으로 이동
  useEffect(() => {
    if (isLoggedIn) { router.replace('/'); }
  }, [isLoggedIn]);

  // 로그인 실패시 사유표현
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

export default Login;