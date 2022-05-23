import React, { Fragment } from 'react';
import styles from './status.module.css';

function Status(props) {
  const statuses = ['전체', '모집중', '모집완료'];

  return (
    <ul className={styles.status}>
      {statuses.map((status, idx) => {
        return (
          <Fragment key={idx}>
            {
              props.status === status
                ?
                <li>
                  <button className={styles.active} onClick={() => { props.onChangeStatus(status); }}>{status}</button>
                </li>
                :
                <li>
                  <button onClick={() => { props.onChangeStatus(status); }}>{status}</button>
                </li>
            }
          </Fragment>
        )
      })}
    </ul>
  );
}

export default Status;