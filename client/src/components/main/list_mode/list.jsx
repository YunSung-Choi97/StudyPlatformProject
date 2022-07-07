import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './list.module.css';

function List(props) {
  const _field = useSelector(state => state.field.value);
  const _status = useSelector(state => state.status.value);
  const _contents = useSelector(state => state.contents.value);
  const _search = useSelector(state => state.search.value);

  let fieldCondition;
  if (_field === '전체') { fieldCondition = true } else { fieldCondition = false }

  let statusCondition;
  if (_status === '전체') { statusCondition = true } else { statusCondition = false }

  return (
    <ul className={styles.items}>
      {_contents.map(content => {
        if ((fieldCondition || (_field === content.field)) && (statusCondition || (_status === content.recruitment))) {
          if (content.title.includes(_search)) {
            return (
              <li className={styles.container} key={content.content_id}>
                <Link to={`/content/${content.content_id}`}>
                  <div className={styles.item}>
                    <h3 className={styles.title}>{content.title}</h3>
                    <p className={styles.body}>{content.body}</p>
                    <div className={styles.classification}>
                      <div>{content.recruitment}</div>
                      <div>{content.field}</div>
                      <div>{content.area}</div>
                    </div>
                    <div className={styles.info}>{content.author} · {content.date}</div>
                  </div>
                </Link>
              </li>);
          }
        } return <Fragment key={content.content_id}/>
      })}
    </ul>
  );
}

export default List;