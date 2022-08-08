import { useSelector } from 'react-redux';
import useInput from '../hooks/use_input';

import styles from '../styles/comments.module.css';

const Comments = () => {
  const { comments, commentsLength } = useSelector((state) => state.post);
  const { isLoggedIn, myInfo } = useSelector((state) => state.user);

  // 새로운 댓글 작성
  const [inputComment, ChangeComment] = useInput('');

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>댓글 {commentsLength}개</div>
        <div>정렬기준</div>
      </div>
      {isLoggedIn
        ?
        <form className={styles.new_comment}>
          <div>{myInfo.nickname}</div>
          <input type='text' value={inputComment} onChange={ChangeComment} placeholder='댓글 추가...' />
          <button>댓글</button>
        </form>
        :
        <div className={styles.new_comment}>
          <input type='text' placeholder='댓글 작성은 로그인 후 이용하실 수 있습니다.' disabled />
        </div>
      }
      {comments && comments.length !== 0 &&
        <ul className={styles.comments}>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className={styles.comment}>
                <div className={styles.comment_header}>
                  <div>{comment.comment_writer_id}</div>
                  <div>{comment.comment_created_date}</div>
                </div>
                <div className={styles.comment_content}>{comment.comment_content}</div>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default Comments;