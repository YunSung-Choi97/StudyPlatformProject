import React from 'react';
import styles from './write.module.css';

function Write(props) {
  return (
    <div className={styles.container}>
      <ul className={styles.status}>
        <li className={styles.whole}>
          <button>전체</button>
        </li>
        <li className={styles.recruiting}>
          <button>모집중</button>
        </li>
        <li className={styles.recruitied}>
          <button>모집완료</button>
        </li>
      </ul>
      <a href="./">
      <button className={styles.write}>글쓰기</button>
      </a>
    </div>
  );
}

export default Write;