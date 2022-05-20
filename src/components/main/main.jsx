import React, { useState } from 'react';
import styles from './main.module.css'
import Status from './list_mode/status';
import Search from './list_mode/search';
import WriteButton from './list_mode/write_button';
import List from './list_mode/list';
import WriteMode from './write_mode/write_mode';

function Main(props) {
  const [status, setStatus] = useState('전체');

  let body;
  if (props.mode === 'list') {
    body =
      <>
        <section className={styles.functional_part}>
          <div className={styles.filter}>
            <Status onChangeMode={(recruit) => { setStatus(recruit) }} />
            <Search />
          </div>
          <WriteButton onChangeMode={(mode) => { props.onChangeMode(mode); }} />
        </section>
        <section className={styles.list}>
          <List contents={props.contents} field={props.field} status={status} />
        </section>
      </>
  } else if (props.mode === 'write') {
    body = <WriteMode />
  }

  return (
    <main>
      <section className={styles.container}>
        {body}
      </section>
    </main>
  );
}

export default Main;