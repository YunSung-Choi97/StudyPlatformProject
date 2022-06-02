import React, { useState } from 'react';
import styles from './search.module.css';
import icon from '../../../assets/images/search.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/reducer/search';

function Search(props) {
  const [searchData, setSearchData] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <form className={styles.container} onSubmit={(event) => {
        event.preventDefault();
        navigate(`?search=${event.target.search.value}`);
        dispatch(setSearch(event.target.search.value));
      }}>
        <div className={styles.search_item}>
          <img className={styles.icon} src={icon} alt='search' />
          <input
            type="text" name='search' value={searchData} placeholder="관심 스터디를 검색해보세요!" onChange={(event) => { setSearchData(event.target.value); }} />
        </div>
        <button className={styles.button}>검색</button>
      </form>
      <button className={styles.reset} onClick={() => {
        navigate('');
        setSearchData('');
        dispatch(setSearch(''));
      }}>Reset</button>
    </>
  );
}

export default Search;