import ToggleSwitch from './toggle_switch';
import styles from '../styles/sort.module.css';

const Sort = () => {
  return (
    <div className={styles.sort}>
      <div className={styles.criterion}>최신순 조회수순 좋아요순</div>
      <ToggleSwitch />
    </div>
  );
};

export default Sort;