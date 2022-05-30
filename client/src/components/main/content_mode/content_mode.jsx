import React, { useEffect } from 'react';
import styles from './content_mode.module.css';
import { useParams } from 'react-router-dom';

function ContentMode(props) {
  const params = useParams();
  const content = props.contents[Number(params.contentId) - 1];
  useEffect(() => {
    if (params.contentId !== undefined) {
      props.onChangeState(null, 'content', '전체');
    }
  })
  
  return (
    <div className={styles.container}>
      {
        content ?
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>{content.title}</h1>
              <div className={styles.info}>
                <p className={styles.author}>{content.author}</p>·
                <p className={styles.date}>{content.date}</p>
              </div>
            </div>
            <p className={styles.body}>{content.body}</p>
          </>
          : <></>
      }
    </div>
  );
}

export default ContentMode;