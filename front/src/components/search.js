import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../hooks/change_query';
import useInput from '../hooks/use_input';
import searchIcon from '../images/search_icon.png';
import styles from '../styles/search.module.css';

const Search = () => {
  const router = useRouter();
  const { category, section, status, search, page } = useSelector((state) => state.page);

  // 검색어
  const [searchText, changeSearchText, setSearchText] = useInput(search ? search : '');

  // 페이지에 따라 검색창에 띄워질 문구
  const setPlaceholder = useCallback(() => {
    if (category === 'community') {
      return '찾으시는 글을 검색해보세요!';
    } else if (category === 'find-member') {
      if (section === 'study') {
        return '관심 스터디를 검색해보세요!';
      } else if (section === 'project') {
        return '관심 프로젝트를 검색해보세요!';
      } else if (section === 'contest') {
        return '관심 공모전을 검색해보세요!';
      } else {
        return '함께할 팀원을 검색해보세요!';
      }
    } else if (category === 'review') {
      return '궁금한 리뷰를 검색해보세요!';
    } else if (category === 'recruitment') {
      return '채용정보를 검색해보세요!';
    } else {
      return '검색어를 입력해주세요';
    }
  }, [category, section]);
  const placeholder = setPlaceholder();

  // 검색어에 의한 필터링 요청
  const searchHandler = useCallback((event) => {
    event.preventDefault();

    // 검색 키워드는 2글자 이상으로만 가능
    if (searchText.length < 2) {
      return alert(`검색하실 내용을 2자 이상으로 검색해주세요.`);
    }

    const newQeury = changeQuery(router, status, searchText, page);
    router.push(`${router.pathname}${newQeury}`);
  }, [searchText, router, status, search, page]);

  // 검색어에 의한 필터링 취소 요청 
  const resetHandler = useCallback(() => {
    // 입력된 검색어 지우기
    setSearchText('');

    // 현재 검색어에 의한 필터링이 된 상태인 경우에만 reset 가능
    if (search) {
      const newQeury = changeQuery(router, status, null, page);
      router.push(`${router.pathname}${newQeury}`);
    }
  }, [router, status, search, page]);

  return (
    <form className={styles.container} onSubmit={searchHandler}>
      <div className={styles.search_item}>
        <Image src={searchIcon} alt='search icon' width={22} height={18} />
        <input type="text" name='search' value={searchText} placeholder={placeholder} onChange={changeSearchText} />
      </div>
      <button className={styles.search_button} type='submit'>검색</button>
      <button className={styles.reset_button} type='button' onClick={resetHandler}>Reset</button>
    </form>
  );
};

export default Search;