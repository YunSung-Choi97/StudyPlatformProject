import Search from './search';
import Status from './status';
import styles from '../styles/functional_part.module.css';

const FunctionalPart = () => {

  return (
    <section className={styles.container}>
      <Status />
      <Search />
      <button>글쓰기</button>
    </section>
  );
};

export default FunctionalPart;