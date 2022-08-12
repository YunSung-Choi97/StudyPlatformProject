import Image from 'next/image';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import pinkHeartIcon from '../images/pink_heart.svg';
import whiteHeartIcon from '../images/white_heart.svg';
import { startLiking, terminateLiking } from '../redux/actions/post';
import styles from '../styles/liking.module.css';

const Liking = () => {
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
      {isLoggedIn !== true
        ?
        <button className={styles.like_button} onClick={notifyLoginHandler}>
          <div className={styles.heart_icon}><Image src={whiteHeartIcon} alt='white heart icon' width={18} height={18} /></div>
          <div className={styles.heart_description}>{post.post_like_number}</div>
        </button>
        : liking
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
      }
    </>
  );
};

export default Liking;