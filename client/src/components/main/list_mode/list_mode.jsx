import React, { useEffect, useState } from 'react';
import styles from './list_mode.module.css';
import Status from './status';
import Search from './search';
import Writing from './writing';
import List from './list';
import { useLocation, useParams } from 'react-router-dom';

function ListMode(props) {
  const fields = ['전체', '어학', '취업', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'];
  const params = useParams();
  useEffect(() => {
    if (params.category === undefined) {
      props.onChangeState('전체', 'list', '전체');
    } else {
      props.onChangeState(fields[Number(params.category)], 'list', props.status);
    }
  }, [])

  const location = useLocation();
  const [search, setSearch] = useState('');

  return (
    <>
      <section className={styles.functional_part}>
        <div className={styles.filter}>
          <Status status={props.status} onChangeStatus={(recruit) => { props.onChangeStatus(recruit) }} />
          <Search onChangeSearch={(search) => { setSearch(search) }} />
        </div>
        <Writing />
      </section>
      <section className={styles.list}>
        <List field={props.field} status={props.status} search={search} contents={props.contents} onChangeSearch={(search) => { setSearch(search) }}/>
      </section>
    </>
  );
}

export default ListMode;