import { useCallback, useState } from 'react';
import styles from '../styles/toggle_switch.module.css';

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleHandler = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);
  console.log(isChecked);
  return (
    <div className={styles.recruitment}>
      <div>모집중만 보기</div>
      <input
        type='checkbox'
        className={styles.toggle}
        checked={isChecked}
        onChange={toggleHandler}
        id='toggle'
        hidden />

      <label htmlFor='toggle' className={styles.label}>
        <div className={styles.ball}></div>
      </label>
    </div>
  )
};

export default ToggleSwitch;