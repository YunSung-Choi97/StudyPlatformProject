import React from 'react';
import styles from './main.module.css'
import { Outlet } from "react-router-dom";

function Main(props) {
  return (
    <main>
      <section className={styles.container}>
        <Outlet />
      </section>
    </main>
  );
}

export default Main;