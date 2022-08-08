import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../hooks/change_query';
import styles from '../styles/page.module.css';

const Page = () => {
  const { status, search, page } = useSelector((state) => state.page);
  const { postsLength } = useSelector((state) => state.posts);
  const router = useRouter();

  // 나타날 page 변경 범위 생성
  const range = useCallback(() => {
    const array = [];
    if (page) {
      for (var i = parseInt((page - 1) / 10) * 10 + 1; i <= parseInt((page - 1) / 10) * 10 + 10 && i <= parseInt((postsLength - 1) / 10) + 1; i++) {
        array.push(i);
      }
    } else {
      for (var i = 1; i <= 10 && i <= parseInt((postsLength - 1) / 10) + 1; i++) {
        array.push(i);
      }
    }
    return array;
  }, [page, postsLength]);
  const numbers = range();

  // 이전 page로 이동
  const moveToPreviousPage = useCallback(() => {
    if (page > 1) {
      const newQuery = changeQuery(router, status, search, page - 1);
      router.push(`${router.pathname}${newQuery}`);
    }
  }, [router, status, search, page]);

  // 이전 pages로 이동
  const moveToPreviousPages = useCallback(() => {
    if (page > 10) {
      const newQuery = changeQuery(router, status, search, parseInt((page - 1) / 10) * 10);
      router.push(`${router.pathname}${newQuery}`);
    } else {
      const newQuery = changeQuery(router, status, search, null);
      router.push(`${router.pathname}${newQuery}`);
    }
  }, [router, status, search, page]);

  // 특정 page로 이동
  const moveToNumberPage = useCallback((pageNumber) => () => {
    const newQuery = changeQuery(router, status, search, pageNumber);
    router.push(`${router.pathname}${newQuery}`);
  }, [router, status, search]);

  // 다음 pages로 이동
  const moveToNextPages = useCallback(() => {
    if (parseInt((page - 1) / 10) * 10 + 11 <= parseInt((postsLength - 1) / 10) + 1) {
      const newQuery = changeQuery(router, status, search, parseInt((page - 1) / 10) * 10 + 11);
      router.push(`${router.pathname}${newQuery}`);
    }
  }, [router, status, search, page, postsLength]);

  // 다음 page로 이동
  const moveToNextPage = useCallback(() => {
    if (page < parseInt((postsLength - 1) / 10) + 1) {
      const newQuery = changeQuery(router, status, search, page + 1);
      router.push(`${router.pathname}${newQuery}`);
    } else {
      const newQuery = changeQuery(router, status, search, 2);
      router.push(`${router.pathname}${newQuery}`);
    }
  }, [router, status, search, page, postsLength]);

  return (
    <nav className={styles.container}>
      <button className={styles.side_button} onClick={moveToPreviousPage}>이전페이지</button>
      <ul className={styles.page_numbers}>
        <li><button className={styles.jump_button} onClick={moveToPreviousPages}>{'<'}</button></li>
        {
          numbers.map((number) => {
            if ((page === null && number === 1) || (page === number)) {
              return (
                <li key={number}><button className={styles.current_page_button} onClick={moveToNumberPage(number)}>{number}</button></li>
              );
            } else {
              return (
                <li key={number}><button className={styles.page_button} onClick={moveToNumberPage(number)}>{number}</button></li>
              );
            }
          })
        }
        <li><button className={styles.jump_button} onClick={moveToNextPages}>{'>'}</button></li>
      </ul>
      <button className={styles.side_button} onClick={moveToNextPage}>다음페이지</button>
    </nav>
  );
};

export default Page;