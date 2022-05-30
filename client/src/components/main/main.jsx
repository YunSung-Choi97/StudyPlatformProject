import React, { useEffect, useState } from 'react';
import styles from './main.module.css'
import ListMode from './list_mode/list_mode';
import WritingMode from './writing_mode/writing_mode';
import ContentMode from './content_mode/content_mode';
import { Route, Routes } from "react-router-dom";

function Main(props) {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    fetch('/api/contents')
      .then((req) => {
        return req.json();
      })
      .then((json) => {
        setContents(json);
      })
  }, []);

  return (
    <main>
      <section className={styles.container}>
        <Routes>
          <Route path='/' element={
            <ListMode
              field={props.field} status={props.status} contents={contents}
              onChangeState={(field, mode, status) => { props.onChangeState(field, mode, status) }}
              onChangeStatus={(recruit) => { props.onChangeStatus(recruit) }} />} />
          <Route path='/category/:category' element={
            <ListMode
              field={props.field} status={props.status} contents={contents}
              onChangeState={(field, mode, status) => { props.onChangeState(field, mode, status) }}
              onChangeStatus={(recruit) => { props.onChangeStatus(recruit) }} />} />
          <Route path='/write' element={
            <WritingMode
              onChangeState={(field, mode, status) => { props.onChangeState(field, mode, status) }} />} />
          <Route path='/content/:contentId' element={
            <ContentMode 
            field={props.field} contents={contents}
            onChangeState={(field, mode, status) => { props.onChangeState(field, mode, status) }} />} />
        </Routes>
      </section>
    </main>
  );
}

export default Main;