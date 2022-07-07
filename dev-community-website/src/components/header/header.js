import React, { useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from './header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setField } from '../../redux/reducer/field';
import { setStatus } from '../../redux/reducer/status';
import { setSearch, setSearchText } from '../../redux/reducer/search';
import { setLogin, setLogout } from '../../redux/reducer/user';
// import Account from './account';

function Header(props) {
  const fields = ['전체', '어학', '취업', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'];
  const _field = useSelector(state => state.field.value);
  const _isLogin = useSelector(state => state.user.isLogin);
  const _userInfo = useSelector(state => state.user.userInfo);
  const searchParams = useSearchParams()[0];
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // URL query 정보에 따라 field state 동기화
    if (location.pathname === '/' && searchParams.has('field')) { dispatch(setField(searchParams.get('field'))); }
    else if (location.pathname === '/' && !searchParams.has('field')) { dispatch(setField('전체')); }
    else { dispatch(setField(null)); };
    // URL query 정보에 따라 status state 동기화
    if (searchParams.has('status')) { dispatch(setStatus(searchParams.get('status'))); }
    else { dispatch(setStatus('전체')); }
    // URL query 정보에 따라 search state 동기화
    if (searchParams.has('search')) { dispatch(setSearch(searchParams.get('search'))); dispatch(setSearchText(searchParams.get('search'))); }
    else { dispatch(setSearch('')); dispatch(setSearchText((''))); }

    // 로그인 상태 확인
    fetch('/api/auth/is_user')
      .then((res) => { return res.json(); })
      .then((user) => {
        if (user.isLogin !== _isLogin) {
          // 로그인 처리
          if (user.isLogin) {
            var userInfo = {
              id: user.id,
              name: user.name,
              nickname: user.nickname
            };
            dispatch(setLogin(userInfo));
            // 로그아웃 처리
          } else {
            dispatch(setLogout());
          }
        }
      });
  }, [_isLogin, location.pathname, searchParams, dispatch]);

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>
          <Link to='/'>Study Finding</Link>
        </div>
        {_isLogin === undefined
          ?
          <div className={styles.account}>
            <button className={styles.login}></button>
            <button className={styles.signup}></button>
          </div>
          : (_isLogin === true
            ?
            <div className={styles.account}>
              <button className={styles.logout} onClick={() => {
                fetch('/api/auth/logout').then(() => {
                  if ((window.location.pathname + window.location.search) === '/') { window.location.reload(); }
                  else { window.location.href = '/'; }
                })
              }}>로그아웃</button>
              <button className={styles.myinfo}>{_userInfo.nickname}</button>
            </div>
            :
            <div className={styles.account}>
              <button className={styles.login} onClick={() => {
                navigate('/login');
              }}>로그인</button>
              <button className={styles.signup} onClick={() => {
                navigate('/signup');
              }}>회원가입</button>
            </div>)
        }
      </div>
      <ul className={styles.navbar}>
        {fields.map((field, idx) => {
          return (
            <Fragment key={idx}>
              <Link to={`/?field=${field}${searchParams.has('status') ? '&status=' + searchParams.get('status') : ''}${searchParams.has('search') ? '&search=' + searchParams.get('search') : ''}`}>
                {
                  _field !== field
                    ? <li className={styles.field}>{field}</li>
                    : <li className={[styles.field, styles.active].join(' ')}>{field}</li>
                }
              </Link>
            </Fragment>)
        })}
      </ul>
    </header>
  );
}

export default Header;