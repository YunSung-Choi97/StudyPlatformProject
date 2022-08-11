import Image from 'next/image';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import pinkHeartIcon from '../images/pink_heart.svg';
import whiteHeartIcon from '../images/white_heart.svg';
import { startLiking, terminateLiking } from '../redux/actions/post';
import styles from '../styles/post.module.css';
import Comments from './comments';

const Post = () => {
  const dispatch = useDispatch();
  const { post, liking, startLikingLoading, terminateLikingLoading } = useSelector((state) => state.post);
  const { isLoggedIn, myInfo } = useSelector((state) => state.user);

  // 게시글 좋아요 요청
  const startLikingHandler = useCallback(() => {
    dispatch(startLiking({
      postId: post.post_id,
      userId: myInfo.id,
    }));
  }, []);

  // 게시글 좋아요 취소 요청
  const terminateLikingHandler = useCallback(() => {
    dispatch(terminateLiking({
      postId: post.post_id,
      userId: myInfo.id,
    }));
  }, []);

  // 게시글 좋아요 요청 불가 안내
  const notifyLoginHandler = useCallback(() => {
    alert('로그인이 필요한 기능입니다.');
  }, []);

  return (
    <>
      {post
        ?
        <>
          <div className={styles.header}>
            <h1>{post.post_title}</h1>
            <div className={styles.info}>
              <div>{post.post_writer_id}</div>
              <div>{post.post_created_date}</div>
            </div>
          </div>
          <div className={styles.content}>
            <p>{post.post_content}</p>
          </div>
          <div className={styles.footer}>
            {
              isLoggedIn
                ? liking
                  ? terminateLikingLoading
                    ?
                    <button className={styles.like_button}>
                      <div className={styles.heart_icon}><Image src={pinkHeartIcon} alt='pink heart icon' width={18} height={18} /></div>
                      <div className={styles.heart_description}>{post.post_like_number}</div>
                    </button>
                    :
                    <button className={styles.like_button} onClick={terminateLikingHandler}>
                      <div className={styles.heart_icon}><Image src={pinkHeartIcon} alt='pink heart icon' width={18} height={18} /></div>
                      <div className={styles.heart_description}>{post.post_like_number}</div>
                    </button>
                  : startLikingLoading
                    ?
                    <button className={styles.like_button}>
                      <div className={styles.heart_icon}><Image src={whiteHeartIcon} alt='white heart icon' width={18} height={18} /></div>
                      <div className={styles.heart_description}>{post.post_like_number}</div>
                    </button>
                    :
                    <button className={styles.like_button} onClick={startLikingHandler}>
                      <div className={styles.heart_icon}><Image src={whiteHeartIcon} alt='white heart icon' width={18} height={18} /></div>
                      <div className={styles.heart_description}>{post.post_like_number}</div>
                    </button>
                :
                <button className={styles.like_button} onClick={notifyLoginHandler}>
                  <div className={styles.heart_icon}><Image src={whiteHeartIcon} alt='white heart icon' width={18} height={18} /></div>
                  <div className={styles.heart_description}>{post.post_like_number}</div>
                </button>
            }
          </div>
          <Comments />
        </>
        : <p>삭제되었거나 존재하지 않는 글입니다.</p>
      }
    </>
  );
};

export default Post;