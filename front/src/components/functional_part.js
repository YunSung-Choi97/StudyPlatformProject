import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Search from './search';
import styles from '../styles/functional_part.module.css';

const FunctionalPart = () => {
  const { category } = useSelector((state) => state.page);
  const { isLoggedIn } = useSelector((state) => state.user);
  const router = useRouter();

  const writeHandler = useCallback(() => {
    if (isLoggedIn) {
      router.push(`/write?category=${category}`);
    } else {
      if (confirm('로그인 후 이용하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?')) {
        router.push('/login');
      }
    }
  }, []);

  return (
    <>
      <section className={styles.container}>
        <Search />
        <button onClick={writeHandler}>글쓰기</button>
      </section>
    </>
  );
};

export default FunctionalPart;