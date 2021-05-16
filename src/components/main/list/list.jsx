import React, { useState } from 'react';
import styles from './list.module.css';

function List(props) {
  return (
    <ul className={styles.items}>
      {props.contents.map(content => {
        return (
          <li className={styles.container} key={content.id}>
            <a href="/">
              <div className={styles.item}>
                <h3 className={styles.title}>{content.title}</h3>
                <p className={styles.body}>{content.body}</p>
                <div className={styles.classification}>
                  <button>{content.recruitment}</button>
                  <button>{content.field}</button>
                  <button>{content.area}</button>
                </div>
                <div className={styles.info}>{content.author} · {content.date}</div>
              </div>
            </a>
          </li>);
      })}
    </ul>
  );
}

export default List;