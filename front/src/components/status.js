import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import styles from '../styles/status.module.css';

const Status = () => {
  const { status } = useSelector((state) => state.page);
  const router = useRouter();

  const sortStatuses = ['전체', '모집중', '모집완료'];
  const changeStatus = useCallback((sortStatus) => () => {
    if (sortStatus === '전체') {
      router.push(`${router.pathname}`);
    } else {
      router.push(`${router.pathname}?status=${sortStatus}`);
    }
  }, []);

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