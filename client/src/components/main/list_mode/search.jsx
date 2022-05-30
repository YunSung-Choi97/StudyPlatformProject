import React, { useState } from 'react';
import styles from './search.module.css';
import icon from '../../../assets/images/search.png'
import { useNavigate } from 'react-router-dom';

function Search(props) {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState('');
  return (
    <>
      <form className={styles.container} onSubmit={(event) => {
        event.preventDefault();
        navigate(`?search=${event.target.search.value}`)
        props.onChangeSearch(event.target.search.value)
      }}>
        <div className={styles.search_item}>
          <img className={styles.icon} src={icon} />
          <input
            type="text" name='search' value={searchData} placeholder="관심 스터디를 검색해보세요!" onChange={(event) => { setSearchData(event.target.value); }} />
        </div>
        <button className={styles.button}>검색</button>
      </form>
      <button className={styles.reset} onClick={() => {
        navigate('');
        props.onChangeSearch('');
        setSearchData('');
      }}>Reset</button>
    </>
  );
}

export default Search;