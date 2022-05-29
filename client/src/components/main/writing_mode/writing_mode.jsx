import React, { useEffect } from 'react';
import styles from './writing_mode.module.css';

function WritingMode(props) {
  const fields = ['어학', '취업', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'];
  const areas = ['서울', '수원', '인천', '대구', '부산', '울산', '광주', '전주', '대전', '세종', '천안', '청주', '원주', '춘천', '제주', '기타']
  useEffect(() => {
    props.onChangeState(null, 'writing', '전체');
  })
  
  return (
    <form className={styles.container} action='/write' method='post'>
      <div className={styles.input}>
        <input type='text' placeholder='제목을 입력해주세요.' name='title' />
      </div>
      <div className={styles.input}>
        <select name='field'>
          {fields.map((field, idx) => { return <option key={idx}>{field}</option> })}
        </select>
      </div>
      <div className={styles.input}>
        <select name='area'>
          {areas.map((area, idx) => { return <option key={idx}>{area}</option> })}
        </select>
      </div>
      <div className={styles.input}>
        <textarea placeholder='내용을 입력해주세요.' name='body' rows='15' />
      </div>
      <div className={styles.button}>
        <button className={styles.button1}>취소</button>
        <button className={styles.button2} type='submit'>저장</button>
      </div>
    </form>
  );
}

export default WritingMode;