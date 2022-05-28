import React from 'react';
import { Link } from 'react-router-dom';
import styles from './writing.module.css';

function Writing(props) {
  return (
    <div className={styles.container}>
      <Link to={'/' + 'write'}>
        <button className={styles.write} >글쓰기</button>
      </Link>
    </div>
  );
}

export default Writing;