import React from 'react';
import styles from './status.module.css';

function Status(props) {
  return (
    <div>
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
    </div>
  );
}

export default Status;