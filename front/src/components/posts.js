import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import getDisplayTime from '../hooks/get_display_time';
import grayHeartIcon from '../images/gray_heart.svg';
import styles from '../styles/posts.module.css';
import Page from './page';

const Posts = () => {
  const { category } = useSelector((state) => state.page);
  const { posts } = useSelector((state) => state.posts);

  return (
    <>
      <ul className={styles.container}>
        {posts && posts.map((post) => {
          return (
            <Fragment key={post.post_id}>
              <Link href={`/${category}/${post.post_id}`}>
                <a>
                  <li className={styles.post}>
                    <div className={styles.info}>
                      <h3 className={styles.title}>{post.post_title}</h3>
                      <p className={styles.content}>{post.post_content}</p>
                      <div className={styles.sub_info}>{post.post_writer_nickname} · {getDisplayTime(post.post_created_date)}</div>
                    </div>
                    <div className={styles.additional_info}>
                      <div className={styles.comment_info}>
                        <div className={styles.comment_number}>{post.post_comment_number}</div>
                        <div className={styles.comment_description}>댓글</div>
                      </div>
                      <div className={styles.like_info}>
                        <Image src={grayHeartIcon} alt='gray heart icon' width={16} height={16} />
                        <div className={styles.like_number}>{post.post_like_number}</div>
                      </div>
                    </div>
                  </li>
                </a>
              </Link>
            </Fragment>
          );
        })}
      </ul>
      <Page />
    </>
  );
};

export default Posts;