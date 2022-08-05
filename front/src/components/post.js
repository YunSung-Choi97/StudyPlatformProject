import { useSelector } from 'react-redux';

import styles from '../styles/post.module.css';

const Post = () => {
  const { post } = useSelector((state) => state.post);
  return (
    <>
      {post
        ?
        <>
          <p>제목 {post.post_title}</p>
          <p>작성자 {post.post_writer_id}</p>
          <p>작성일 {post.post_created_date}</p>
          <p>조회수 {post.post_views}</p>
          <p>좋아요 {post.post_like_number}</p>
          <p>내용 {post.post_content}</p>
        </>
        : <p>글을 불러오지 못했습니다.</p>
      }
    </>
  );
};

export default Post;