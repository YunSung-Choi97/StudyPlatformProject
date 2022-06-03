import React, { useEffect ,Fragment } from 'react';
import { Link, useLocation, useSearchParams } from "react-router-dom";
import styles from './header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setField } from '../../redux/reducer/field';

function Header(props) {
  const fields = ['전체', '어학', '취업', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'];
  const _field = useSelector(state => state.field.value);
  const searchParams = useSearchParams()[0];
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/' && searchParams.has('field')) { dispatch(setField(searchParams.get('field'))); }
    else if (location.pathname === '/' && !searchParams.has('field')) { dispatch(setField('전체')); }
    else { dispatch(setField(null)); }
  })

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>
          <Link to='/'>Study Finding</Link>
        </div>
        <div className={styles.account}>
          <button className={styles.signin}>로그인</button>
          <button className={styles.signup}>회원가입</button>
        </div>
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