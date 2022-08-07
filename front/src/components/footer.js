import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <p>DCW</p>
        <p>대표자: 최윤성</p>
        <p>전화번호: 010-0000-0000</p>
      </div>
    </section>
  );
};

export default Footer;