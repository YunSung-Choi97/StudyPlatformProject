import React, { useState } from 'react';
import styles from './header.module.css';

function Header(props) {
  const fields = ['전체', '어학', '취업', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'];

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>
          <a href='/' onClick={(event) => {
            event.preventDefault();
            props.onChangeField('전체', 'list', '전체');
          }}>Study Finding</a>
        </div>
        <div className={styles.account}>
          <button className={styles.signin}>로그인</button>
          <button className={styles.signup}>회원가입</button>
        </div>
      </div>
      <ul className={styles.navbar}>
        {fields.map((field, idx) => {
          return (
            <a key={idx} href='/' onClick={(event) => {
              event.preventDefault();
              props.onChangeField(field, 'list', props.status);
            }}>
              {
                props.field !== field
                ? <li key={idx} className={styles.field}>{field}</li>
                : <li key={idx} className={[styles.field, styles.active].join(' ')}>{field}</li>
              }
            </a>)
        })}
      </ul>
    </header>
  );
}

export default Header;