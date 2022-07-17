import Image from 'next/image';
import { useCallback } from 'react';

import useInput from '../hooks/use_input';
import searchIcon from '../images/search_icon.png';
import styles from '../styles/search.module.css';

const Search = () => {
  // const dispatch = useDispatch();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const _searchText = useSelector(state => state.search.searchText);
  // const changeSearchParams = (search) => {
  //   if (search === undefined) {
  //     if (searchParams.has('field')) {
  //       if (searchParams.has('status')) {
  //         setSearchParams({ field: searchParams.get('field'), status: searchParams.get('status') })
  //       } else {
  //         setSearchParams({ field: searchParams.get('field') })
  //       }
  //     } else {
  //       if (searchParams.has('status')) {
  //         setSearchParams({ status: searchParams.get('status') })
  //       } else {
  //         setSearchParams({})
  //       }
  //     }
  //   } else {
  //     if (searchParams.has('field')) {
  //       if (searchParams.has('status')) {
  //         setSearchParams({ field: searchParams.get('field'), status: searchParams.get('status'), search })
  //       } else {
  //         setSearchParams({ field: searchParams.get('field'), search })
  //       }
  //     } else {
  //       if (searchParams.has('status')) {
  //         setSearchParams({ status: searchParams.get('status'), search })
  //       } else {
  //         setSearchParams({ search })
  //       }
  //     }
  //   }
  // }
  const [searchText, changeSearchText] = useInput('');

  const resetHandler = useCallback(() => {
    // changeSearchParams(_searchText);
  }, []);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    // changeSearchParams(_searchText);
  }, []);

  return (
    <form className={styles.search} onSubmit={submitHandler}>
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