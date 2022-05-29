import React, { useEffect } from 'react';
import styles from './list_mode.module.css';
import Status from './status';
import Search from './search';
import Writing from './writing';
import List from './list';
import { useParams } from 'react-router-dom';

function ListMode(props) {
  const fields = ['전체', '어학', '취업', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'];
  const params = useParams();
  useEffect(() => {
    if (params.category === undefined) {
      props.onChangeState('전체', 'list', '전체');
    } else {
      props.onChangeState(fields[Number(params.category)], 'list', props.status);
    }
  })

  return (
    <>
      <section className={styles.functional_part}>
        <div className={styles.filter}>
          <Status status={props.status} onChangeStatus={(recruit) => { props.onChangeStatus(recruit) }} />
          <Search />
        </div>
        <Writing />
      </section>
      <section className={styles.list}>
        <List field={props.field} status={props.status} contents={props.contents} />
      </section>
    </>
  );
}

export default ListMode;