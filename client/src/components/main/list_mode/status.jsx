import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from './status.module.css';

function Status(props) {
  const statuses = ['전체', '모집중', '모집완료'];
  const _status = useSelector((state) => state.status.value);
  const [searchParams, setSearchParams] = useSearchParams();
  
  return (
    <ul className={styles.status}>
      {statuses.map((status, idx) => {
        return (
          <Fragment key={idx}>
            {
              _status === status
                ?
                <li>
                  <button className={styles.active} onClick={() => {
                    if (searchParams.has('field')) {
                      if (searchParams.has('search')) {
                        setSearchParams({ field: searchParams.get('field'), status: status, search: searchParams.get('search') })
                      } else {
                        setSearchParams({ field: searchParams.get('field'), status: status })
                      }
                    } else {
                      if (searchParams.has('search')) {
                        setSearchParams({ status: status, search: searchParams.get('search') })
                      } else {
                        setSearchParams({ status: status })
                      }
                    }
                  }}>{status}</button>
                </li>
                :
                <li>
                  <button onClick={() => {
                    if (searchParams.has('field')) {
                      if (searchParams.has('search')) {
                        setSearchParams({ field: searchParams.get('field'), status: status, search: searchParams.get('search') })
                      } else {
                        setSearchParams({ field: searchParams.get('field'), status: status })
                      }
                    } else {
                      if (searchParams.has('search')) {
                        setSearchParams({ status: status, search: searchParams.get('search') })
                      } else {
                        setSearchParams({ status: status })
                      }
                    }
                  }}>{status}</button>
                </li>
            }
          </Fragment>
        )
      })}
    </ul>
  );
}

export default Status;