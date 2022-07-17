import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/actions/user';
import styles from '../../styles/header.module.css';

const User = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const moveLoginPage = useCallback(() => {
    router.push('/login');
  }, []);
  const moveSignupPage = useCallback(() => {
    router.push('/signup');
  }, []);
  const LogoutAndMoveHome = useCallback(() => {
    dispatch(logout({ id: userInfo.id }));
  }, [userInfo]);
  const moveMyInfoPage = useCallback(() => {
    router.push('/my-info');
  }, []);

  return (
    <>
      {isLoggedIn
        ?
        <div className={styles.user}>
          <button className={styles.logout} onClick={LogoutAndMoveHome}>
            로그아웃
          </button>
          <button className={styles.my_info} onClick={moveMyInfoPage}>
            내정보
          </button>
        </div>
        :
        <div className={styles.user}>
          <button className={styles.login} onClick={moveLoginPage}>
            로그인
          </button>
          <button className={styles.signup} onClick={moveSignupPage}>
            회원가입
          </button>
        </div>
      }
    </>
  );
};

export default User;