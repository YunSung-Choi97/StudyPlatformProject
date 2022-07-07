import React from 'react';
import styles from '../styles/header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div>로고</div>
      <nav className={styles.nav}>
        <div>자유게시판</div>
        <div>스터디</div>
        <div>프로젝트/공모전</div>
        <div>후기/평점</div>
      </nav>
      <div>유저정보</div>
    </header>
  );
};

export default Header;