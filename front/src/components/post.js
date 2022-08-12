import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deletePost } from '../redux/actions/post';
import styles from '../styles/post.module.css';
import Comments from './comments';
import Liking from './liking';

const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.page);
  const { post, deletePostLoading, deletePostDone, deletePostError, } = useSelector((state) => state.post);
  const { isLoggedIn, myInfo } = useSelector((state) => state.user);

  // 게시글 삭제하기 요청
  const deletePostHandler = useCallback(() => {
    dispatch(deletePost({ post_id: post.post_id }));
  }, [post]);

  // 게시글 삭제하기 요청 성공
  useEffect(() => {
    if (deletePostDone) {
      router.replace(`/${category}`);
    }
  }, [deletePostDone]);

  // 게시글 삭제하기 요청 실패
  useEffect(() => {
    if (deletePostError) {
      alert('게시글 삭제에 실패하였습니다.\n다시 시도해주세요.');
    }
  }, [deletePostError]);

  return (
    <>
      {post &&
        <>
          <div className={styles.header}>
            <h1>{post.post_title}</h1>
            <div className={styles.info}>
              <div>{post.post_writer_nickname}</div>
              <div>{post.post_created_date}</div>
              {(isLoggedIn && post.post_writer_id === myInfo.id) &&
                <div>
                  {deletePostLoading
                    ? <button className={styles.controler}>삭제</button>
                    : <button className={styles.controler} onClick={deletePostHandler}>삭제</button>
                  }
                </div>
              }
            </div>
          </div>
          <div className={styles.content}>
            <p>{post.post_content}</p>
          </div>
          <div className={styles.footer}>
            <Liking />
          </div>
          <Comments />
        </>
      }
    </>
  );
};

export default Post;