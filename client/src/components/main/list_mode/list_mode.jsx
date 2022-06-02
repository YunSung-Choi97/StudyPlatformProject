import React, { useEffect } from 'react';
import styles from './list_mode.module.css';
import Status from './status';
import Search from './search';
import Writing from './writing';
import List from './list';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setField, setFieldIdx } from '../../../redux/reducer/field';
import { setStatus } from '../../../redux/reducer/status';
import { setContents } from '../../../redux/reducer/contents';
import { setSearch } from '../../../redux/reducer/search';

function ListMode(props) {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('/contents')
      .then((req) => { return req.json(); })
      .then((json) => { dispatch(setContents(json)); });
    if (params.categoryId === undefined) {
      dispatch(setField('전체'));
      dispatch(setStatus('전체'))
    } else {
      dispatch(setFieldIdx(Number(params.categoryId)));
      dispatch(setStatus('전체'))
    }
    dispatch(setSearch(''));
  }, [dispatch, params.categoryId]);

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