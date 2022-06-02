import React from 'react';
import styles from './main.module.css'
import ListMode from './list_mode/list_mode';
import WritingMode from './writing_mode/writing_mode';
import ContentMode from './content_mode/content_mode';
import { Route, Routes } from "react-router-dom";

function Main(props) {
  return (
    <main>
      <section className={styles.container}>
        <Routes>
          <Route path='/' element={<ListMode />} />
          <Route path='/category/:categoryId' element={<ListMode />} />
          <Route path='/write' element={<WritingMode />} />
          <Route path='/content/:contentId' element={<ContentMode />} />
        </Routes>
      </section>
    </main>
  );
}

export default Main;