import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../hooks/change_query';
import styles from '../styles/status.module.css';

const Status = () => {
  const router = useRouter();
  const { status, search, page } = useSelector((state) => state.page);

  const sortStatuses = ['전체', '모집중', '모집완료'];
  const changeStatus = useCallback((sortStatus) => () => {
    const newQeury = sortStatus === '전체' ? changeQuery(router, null, search, page) : changeQuery(router, sortStatus, search, page);
    router.push(`${router.pathname}${newQeury}`);
  }, [router, search, page]);

  return (
    <ul className={styles.container}>
      {
        sortStatuses.map((sortStatus, idx) => {
          return (
            <li key={idx}>
              {
                sortStatus === status || (sortStatus === '전체' && status === null)
                  ?
                  <button className={styles.active} onClick={changeStatus(sortStatus)}>{sortStatus}</button>
                  :
                  <button onClick={changeStatus(sortStatus)}>{sortStatus}</button>
              }
            </li>
          );
        })
      }
    </ul>
  );
};

export default Status;