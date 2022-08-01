import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Search from './search';
import Status from './status';
import styles from '../styles/functional_part.module.css';

const FunctionalPart = () => {
  const { category } = useSelector((state) => state.page);
  const router = useRouter();

  const writeHandler = useCallback(() => {
    router.push(`/write?category=${category}`);
  }, []);

  return (
    <section className={styles.container}>
      <Status />
      <Search />
      <button onClick={writeHandler}>글쓰기</button>
    </section>
  );
};

export default FunctionalPart;