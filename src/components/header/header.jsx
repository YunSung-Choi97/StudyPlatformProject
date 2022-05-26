import React, { Fragment } from 'react';
import { Link, useLocation, useSearchParams, useParams } from "react-router-dom";
import styles from './header.module.css';

function Header(props) {
  const fields = ['전체', '어학', '취업', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'];
  const location = useLocation();

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>
          <Link to='/' onClick={() => {
            props.onChangeState('전체', 'list', '전체');
          }}>Study Finding</Link>
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
              <Link to={'/?category=' + idx} onClick={() => {
                props.onChangeState(field, 'list', props.status);
              }}>
                {
                  props.field !== field
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