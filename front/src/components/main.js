import styles from '../styles/main.module.css';

const Main = ({ children }) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default Main;