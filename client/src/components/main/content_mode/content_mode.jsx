import React, { useEffect, useState } from 'react';
import styles from './content_mode.module.css';
import { useNavigate, useParams } from 'react-router-dom';

function ContentMode(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState({})
  useEffect(() => {
    fetch(`/api/contents/${params.contentId}`)
      .then((res) => { return res.json(); })
      .then((json) => { setContent(json); });
  }, [params.contentId])

  return (
    <>
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
      <div className={styles.button}>
      <button className={styles.back} type='button' onClick={() => { navigate(-1); }}>뒤로가기</button>
      </div>
      
    </>
  );
}

export default ContentMode;