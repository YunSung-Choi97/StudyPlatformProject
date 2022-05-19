import React from 'react';
import styles from './search.module.css';
import icon from '../../../assets/images/search.png'

function Search(props) {
  return (
    <form>
      <div className={styles.container}>
        <div className={styles.search_item}>
          <img className={styles.icon} src={icon} />
          <input type="text" placeholder="관심 스터디를 검색해보세요!" />
        </div>
        <a href="/">
          <button className={styles.button}>검색</button>
        </a>
      </div>
      
    </form>
  );
}

export default Search;