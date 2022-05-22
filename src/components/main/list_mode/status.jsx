import React from 'react';
import styles from './status.module.css';

function Status(props) {
  const statuses = ['전체', '모집중', '모집완료'];

  return (
    <ul className={styles.status}>
      {statuses.map((status, idx) => {
        return (
          <>
            {
              props.status === status
                ?
                <li key={idx}>
                  <button key={idx} className={styles.active} onClick={() => { props.onChangeStatus(status); }}>{status}</button>
                </li>
                :
                <li key={idx}>
                  <button key={idx} onClick={() => { props.onChangeStatus(status); }}>{status}</button>
                </li>
            }
          </>
        )
      })}
    </ul>
  );
}

export default Status;