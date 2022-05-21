import React from 'react';
import styles from './writing.module.css';

function Writing(props) {
  return (
    <div className={styles.container}>
      <button className={styles.write} onClick={() => { props.onChangeMode('writing'); }}>글쓰기</button>
    </div>
  );
}

export default Writing;