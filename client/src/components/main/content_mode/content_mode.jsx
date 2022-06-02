import React, { useEffect, useState } from 'react';
import styles from './content_mode.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setField } from '../../../redux/reducer/field';

function ContentMode(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState({})
  useEffect(() => {
    fetch(`/contents/${params.contentId}`)
      .then((req) => { return req.json(); })
      .then((json) => { setContent(json); });
    dispatch(setField(null));
  }, [dispatch, params.contentId])

  return (
    <div className={styles.container}>
      {
        content
          ?
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
          :
          <></>
      }
    </div>
  );
}

export default ContentMode;