import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/actions/user';
import styles from '../../styles/header.module.css';

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, myInfo } = useSelector((state) => state.user);

  const moveLoginPage = useCallback(() => {
    router.push('/login');
  }, []);
  const moveSignupPage = useCallback(() => {
    router.push('/signup');
  }, []);
  const logoutAndMoveHome = useCallback(() => {
    dispatch(logout({ id: myInfo.id }));
  }, [myInfo]);
  const moveMyInfoPage = useCallback(() => {
    router.push('/my-info');
  }, []);

  return (
    <>
      {isLoggedIn
        ?
        <div className={styles.user}>
          <button className={styles.logout} onClick={logoutAndMoveHome}>
            로그아웃
          </button>
          <button className={styles.my_info} onClick={moveMyInfoPage}>
            내 정보
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