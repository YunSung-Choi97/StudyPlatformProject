import React from 'react';
import styles from './search.module.css';
import icon from '../../../assets/images/search.png'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../../redux/reducer/search';

function Search(props) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const _searchText = useSelector(state => state.search.searchText);
  const changeSearchParams = (search) => {
    if (search === undefined) {
      if (searchParams.has('field')) {
        if (searchParams.has('status')) {
          setSearchParams({ field: searchParams.get('field'), status: searchParams.get('status') })
        } else {
          setSearchParams({ field: searchParams.get('field') })
        }
      } else {
        if (searchParams.has('status')) {
          setSearchParams({ status: searchParams.get('status') })
        } else {
          setSearchParams({})
        }
      }
    } else {
      if (searchParams.has('field')) {
        if (searchParams.has('status')) {
          setSearchParams({ field: searchParams.get('field'), status: searchParams.get('status'), search })
        } else {
          setSearchParams({ field: searchParams.get('field'), search })
        }
      } else {
        if (searchParams.has('status')) {
          setSearchParams({ status: searchParams.get('status'), search })
        } else {
          setSearchParams({ search })
        }
      }
    }
  }

  return (
    <>
      <form className={styles.container} onSubmit={(event) => {
        event.preventDefault();
        changeSearchParams(_searchText);
      }}>
        <div className={styles.search_item}>
          <img className={styles.icon} src={icon} alt='search' />
          <input
            type="text" name='search' value={_searchText} placeholder="관심 스터디를 검색해보세요!" onChange={(event) => { dispatch(setSearchText(event.target.value)); }} />
        </div>
        <button className={styles.button} type='submit'>검색</button>
        <button className={styles.reset} type='button' onClick={() => {
          changeSearchParams();
        }}>Reset</button>
      </form>
    </>
  );
}

export default Search;