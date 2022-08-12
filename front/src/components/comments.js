import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addComment, deleteComment } from '../redux/actions/post';
import styles from '../styles/comments.module.css';

const Comments = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { post, comments, commentsLength, addCommentLoading, addCommentDone, addCommentError, deleteCommentLoading, deleteCommentError } = useSelector((state) => state.post);
  const { isLoggedIn, myInfo } = useSelector((state) => state.user);

  // 새로운 댓글 내용
  const [inputComment, setInputComment] = useState('');
  const changeComment = useCallback((event) => {
    setInputComment(event.target.value);
  }, []);

  // 댓글 작성하기 요청
  const addCommentHandler = useCallback(() => {
    dispatch(addComment({
      post_id: post.post_id,
      comment_writer_id: myInfo.id,
      comment_content: inputComment,
    }));
  }, [post, myInfo, inputComment]);

  // 댓글 작성하기 요청 성공
  useEffect(() => {
    if (addCommentDone) {
      setInputComment('');
    }
  }, [addCommentDone]);

  // 댓글 작성하기 요청 실패
  useEffect(() => {
    if (addCommentError) {
      alert('댓글 작성에 실패하였습니다.\n다시 시도해주세요.');
    }
  }, [addCommentError]);

  // 댓글 삭제하기 요청
  const deleteCommentHandler = useCallback((commentId) => () => {
    dispatch(deleteComment({
      post_id: post.post_id,
      comment_id: commentId,
    }));
  }, [post]);

  // 댓글 삭제하기 요청 실패
  useEffect(() => {
    if (deleteCommentError) {
      alert('댓글 삭제에 실패하였습니다.\n다시 시도해주세요.');
    }
  }, [deleteCommentError]);

  return (
    <div className={styles.container}>
      <div className={styles.comments_info}>
        <div>댓글 {commentsLength}개</div>
        <div>정렬기준</div>
      </div>
      {isLoggedIn !== true
        ?
        <form className={styles.new_comment}>
          <div className={styles.content_box}>
            <input type='text' placeholder='댓글 작성은 로그인 후 이용하실 수 있습니다.' disabled />
            <button type='submit' disabled>댓글</button>
          </div>
        </form>
        :
        <form className={styles.new_comment}>
          <div className={styles.writer_info}>{myInfo.nickname}</div>
          <div className={styles.content_box}>
            <input type='text' value={inputComment} onChange={changeComment} placeholder='댓글 추가...' />
            {
              inputComment === ''
                ? <button type='submit' disabled>댓글</button>
                : addCommentLoading
                  ? <button className={styles.active} type='submit' disabled>댓글</button>
                  : <button className={styles.active} type='submit' onClick={addCommentHandler}>댓글</button>
            }
          </div>
        </form>
      }
      {comments && comments.length !== 0 &&
        <ul className={styles.comments}>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className={styles.comment}>
                <div className={styles.comment_info}>
                  <div>{comment.comment_writer_nickname}</div>
                  <div className={styles.date_view}>{comment.comment_created_date}</div>
                  {(isLoggedIn && comment.comment_writer_id === myInfo.id) && (
                    deleteCommentLoading
                      ? <button className={styles.controler}>삭제</button>
                      : <button className={styles.controler} onClick={deleteCommentHandler(comment.comment_id)}>삭제</button>
                  )}
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