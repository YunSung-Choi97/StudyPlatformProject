import { useCallback } from "react";
import { useDispatch } from "react-redux";

import Search from "./search";
import Status from "./status";
import styles from '../styles/functional_part.module.css';
import { test } from "../redux/actions/user";

const FunctionalPart = () => {
  const dispatch = useDispatch();
  const testRequest = useCallback(() => {
    dispatch(test());
  }, []);

  return (
    <section className={styles.container}>
      <Status />
      <Search />
      <button onClick={testRequest} >글쓰기</button>
    </section>
  );
};

export default FunctionalPart;