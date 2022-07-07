import React, { useEffect } from 'react';
import styles from './list_mode.module.css';
import Status from './status';
import Search from './search';
import Writing from './writing';
import List from './list';
import { useDispatch } from 'react-redux';
import { setContents } from '../../../redux/reducer/contents';

function ListMode(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('/api/contents')
      .then((res) => { return res.json(); })
      .then((json) => { dispatch(setContents(json)); });
  }, [dispatch]);

  return (
    <>
      <section className={styles.functional_part}>
        <div className={styles.filter}>
          <Status />
          <Search />
        </div>
        <Writing />
      </section>
      <section className={styles.list}>
        <List />
      </section>
    </>
  );
}

export default ListMode;