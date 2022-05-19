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
    /* <header>
      <div className="header__container">
        <div className="title">Study Finding</div>
        <div className="sub-menu">
          <div className="btn__area">
            <a href="/signin" target="_BLANK" rel="noreferrer">
              <button>로그인</button>
            </a>
            <a href="/joinin" target="_BLANK" rel="noreferrer">
              <button>회원가입</button>
            </a>
          </div>
        </div>
        <div className="main-menu">
          <ul className="item">
            <li>전체</li>
            <li>어학</li>
            <li>취업</li>
            <li>고시/공무원</li>
            <li>취미/교양</li>
            <li>프로그래밍</li>
            <li>기타</li>
          </ul>
        </div>
      </div>
    </header> */
  );
}

export default Header;