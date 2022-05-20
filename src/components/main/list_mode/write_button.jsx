import React from 'react';
import styles from './write_button.module.css';

function WriteButton(props) {
  return (
    <div className={styles.container}>
      <button className={styles.write} onClick={() => { props.onChangeMode('write'); }}>글쓰기</button>
    </div>
  );
}

export default WriteButton;