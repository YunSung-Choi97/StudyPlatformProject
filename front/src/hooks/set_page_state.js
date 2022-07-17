import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setPage } from "../redux/reducers/page";

const setPageState = (category, section) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.query.status) {
      dispatch(setPage({
        category,
        section,
        status: router.query.status
      }));
    } else {
      dispatch(setPage({
        category,
        section,
        status: '전체'
      }));
    }
  }, [router.query.status]);
};

export default setPageState;