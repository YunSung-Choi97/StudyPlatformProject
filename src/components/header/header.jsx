import React from 'react';
import styles from './header.module.css';

function Header(props) {
  const fields = ["전체", "어학", "취업", "고시/공무원", "취미/교양", "프로그래밍", "기타"]

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>
          <a href='/'>Study Finding</a>
        </div>
        <div className={styles.account}>
          <button className={styles.signin}>로그인</button>
          <button className={styles.signup}>회원가입</button>
        </div>
      </div>
      <ul className={styles.navbar}>
        {fields.map(field => { return <li className={styles.field}>{field}</li> })}
      </ul>
    </header>
  );
}

export default Header;