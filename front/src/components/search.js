import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import useInput from '../hooks/use_input';
import searchIcon from '../images/search_icon.png';
import styles from '../styles/search.module.css';

const Search = () => {
  const router = useRouter();
  const [searchText, changeSearchText] = useInput('');

  const searchHandler = useCallback((event) => {
    event.preventDefault();
    // changeSearchParams(_searchText);
  }, []);

  const resetHandler = useCallback(() => {
    // changeSearchParams(_searchText);
  }, []);

  return (
    <form className={styles.search} onSubmit={searchHandler}>
      <div className={styles.search_item}>
        <Image src={searchIcon} alt='search icon' />
        <input
          type="text" name='search' value={searchText} placeholder="관심 스터디를 검색해보세요!" onChange={changeSearchText} />
      </div>
      <button className={styles.button} type='submit'>검색</button>
      <button className={styles.reset} type='button' onClick={resetHandler}>Reset</button>
    </form>
  );
};

export default Search;