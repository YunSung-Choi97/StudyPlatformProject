import React, { useEffect } from 'react';
import styles from './list_mode.module.css';
import Status from './status';
import Search from './search';
import Writing from './writing';
import List from './list';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStatus } from '../../../redux/reducer/status';
import { setContents } from '../../../redux/reducer/contents';
import { setSearch, setSearchText } from '../../../redux/reducer/search';

function ListMode(props) {
  const searchParams = useSearchParams()[0];
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('/contents')
      .then((res) => { return res.json(); })
      .then((json) => { dispatch(setContents(json)); });
    if (searchParams.has('status')) { dispatch(setStatus(searchParams.get('status'))); }
    else { dispatch(setStatus('전체')); }
    if (searchParams.has('search')) { dispatch(setSearch(searchParams.get('search'))); dispatch(setSearchText(searchParams.get('search'))); }
    else { dispatch(setSearch('')); dispatch(setSearchText((''))); }
    console.log(searchParams.get('field'), searchParams.get('status'), searchParams.get('search'))
  }, [dispatch, searchParams]);

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