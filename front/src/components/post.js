import Image from 'next/image';
import { useSelector } from 'react-redux';

import Comments from './comments';
import commentIcon from '../images/comment_icon.svg';
import commentIcon2 from '../images/comment_icon2.svg';
import commentIcon3 from '../images/comment_icon3.svg';
import commentIcon4 from '../images/comment_icon4.svg';
import commentIcon5 from '../images/comment_icon5.svg';
import viewIcon from '../images/view_icon.svg';
import viewIcon2 from '../images/view_icon2.svg';
import viewIcon3 from '../images/view_icon3.svg';
import styles from '../styles/post.module.css';

const Post = () => {
  const { post } = useSelector((state) => state.post);

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
              {/* <div><Image src={commentIcon} alt='comment icon' width={18} height={18} />{post.post_views}</div>
              <div><Image src={commentIcon2} alt='comment icon' width={14} height={14} />{post.post_views}</div>
              <div><Image src={commentIcon3} alt='comment icon' width={18} height={18} />{post.post_views}</div>
              <div><Image src={commentIcon4} alt='comment icon' width={16} height={16} />{post.post_views}</div>
              <div><Image src={commentIcon5} alt='comment icon' width={15} height={15} /><div>{post.post_views}</div></div>
              <div><Image src={viewIcon} alt='comment icon' width={18} height={18} />{post.post_like_number}</div>
              <div><Image src={viewIcon2} alt='comment icon' width={18} height={18} />{post.post_like_number}</div>
              <div><Image src={viewIcon3} alt='comment icon' width={18} height={18} />{post.post_like_number}</div> */}
            </div>
          </div>
          <div className={styles.content}>
            <p>{post.post_content}</p>
          </div>
          <div className={styles.footer}>좋아요</div>
          <Comments />
        </>
        : <p>삭제되었거나 존재하지 않는 글입니다.</p>
      }
    </>
  );
};

export default Post;