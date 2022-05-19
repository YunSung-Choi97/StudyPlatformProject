import React from 'react';
import styles from './write.module.css';

function Write(props) {
  return (
    <div className={styles.container}>
      <button className={styles.write}>글쓰기</button>
    </div>
  );
}

export default Write;