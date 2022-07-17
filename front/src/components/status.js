import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import styles from '../styles/status.module.css';

const Status = () => {
  const sortStatuses = ['전체', '모집중', '모집완료'];
  const { status } = useSelector((state) => state.page);
  const router = useRouter();

  const changeStatus = useCallback((sortStatus) => () => {
    router.push(`${router.pathname}?status=${sortStatus}`);
  }, []);

  return (
    <ul className={styles.status}>
      {
        sortStatuses.map((sortStatus, idx) => {
          return (
            <li key={idx}>
              {
                sortStatus === status
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