import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../../redux/reducer/status';
import styles from './status.module.css';

function Status(props) {
  const statuses = ['전체', '모집중', '모집완료'];
  const _status = useSelector((state) => state.status.value);
  const dispatch = useDispatch();

  return (
    <ul className={styles.status}>
      {statuses.map((status, idx) => {
        return (
          <Fragment key={idx}>
            {
              _status === status
                ?
                <li>
                  <button className={styles.active} onClick={() => { dispatch(setStatus(status)); }}>{status}</button>
                </li>
                :
                <li>
                  <button onClick={() => { dispatch(setStatus(status)); }}>{status}</button>
                </li>
            }
          </Fragment>
        )
      })}
    </ul>
  );
}

export default Status;