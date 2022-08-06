import Link from 'next/link';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/posts.module.css';

const Posts = () => {
  const { category } = useSelector((state) => state.page);
  const { posts } = useSelector((state) => state.post);

  return (
    <ul className={styles.container}>
      {posts && posts.map((post) => {
        return (
          <Fragment key={post.post_id}>
            <Link href={`/${category}/${post.post_id}`}>
              <a>
                <li className={styles.post}>
                  <h3 className={styles.title}>{post.post_title} // debug {post.post_id} {post.post_category} {post.post_section} {post.post_status}</h3>
                  <p className={styles.body}>{post.post_content}</p>
                  <div className={styles.info}>{post.post_writer_id} · {post.post_created_date} · 조회수 {post.post_views} · 좋아요 {post.post_like_number}</div>
                </li>
              </a>
            </Link>
          </Fragment>
        );
      })}
    </ul>
  );
};

export default Posts;