import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/main';
import Seo from '../components/seo';
import useInput from '../hooks/use_input';
import { loadMyInfo, signup } from '../redux/actions/user';
import { setPage } from '../redux/reducers/page';
import { signupEnd } from '../redux/reducers/user';
import wrapper from '../redux/store';
import styles from '../styles/signup.module.css';

const Signup = () => {
  const dispatch = useDispatch();
  const { signupDone, signupErrorMessage } = useSelector((state) => state.user);
  const router = useRouter();

  // 회원가입에 필요한 입력 정보 (id, password, name, nickname)
  const [inputId, changeInputId] = useInput('');
  const [inputPassword, changeInputPassword] = useInput('');
  const [inputName, changeInputName] = useInput('');
  const [inputNickname, changeInputNickname] = useInput('');

  // id 중복 확인
  const [idVerification, setIdVerification] = useState(undefined);
  const verifyIdHandler = useCallback(async () => {
    try {
      const response = await axios.post('/user/verify-id', { inputId: inputId });
      setIdVerification(true);
      alert(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        setIdVerification(false);
      }
      alert(error.response.data);
    }
  }, [inputId]);

  // password 일치 확인
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(undefined);
  const changeInputPasswordCheck = useCallback((event) => {
    setInputPasswordCheck(event.target.value);
    setPasswordConfirmation(event.target.value === inputPassword);
  }, [inputPassword, inputPasswordCheck]);

  // nickname 중복 확인
  const [nicknameVerification, setnicknameVerification] = useState(undefined);
  const verifyNicknameHandler = useCallback(async () => {
    try {
      const response = await axios.post('/user/verify-nickname', { inputNickname: inputNickname });
      setnicknameVerification(true);
      alert(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        setnicknameVerification(false);
      }
      alert(error.response.data);
    }
  }, [inputNickname]);

  // 회원가입 요청
  const submit_handler = useCallback(() => {
    // id 중복확인 결과 확인
    if (!idVerification) {
      return alert('아이디 중복확인이 필요합니다.');
    }
    // 비밀번호 일치 재확인
    if (inputPassword !== inputPasswordCheck) {
      console.log(`회원가입 실패 : ${inputId}, ${inputPassword}, ${inputPasswordCheck}, ${inputName}, ${inputNickname}`);
      return setPasswordConfirmation(false);
    }
    // nickname 중복확인 결과 재확인
    if (!nicknameVerification) {
      return alert('닉네임 중복확인이 필요합니다.');
    }

    // 유효한 입력정보 제출
    dispatch(signup({ inputId, inputPassword, inputName, inputNickname }));
  }, [inputId, inputPassword, inputPasswordCheck, inputName, inputNickname, idVerification, nicknameVerification]);

  // 회원가입 요청 결과 처리
  useEffect(() => {
    // 회원가입 성공
    if (signupDone) {
      alert(signupDone);
      router.replace('/login');
    }
    // 회원가입 실패
    if (signupErrorMessage) {
      alert(signupErrorMessage);
    }
    dispatch(signupEnd());
  }, [signupDone, signupErrorMessage]);

  return (
    <>
      <Seo title='DCW' />
      <Main>
        <div className={styles.container}>
          <div className={styles.id_box}>
            <input type='text' name='inputId' placeholder='아이디' value={inputId} onChange={changeInputId} required />
            <button type='button' onClick={verifyIdHandler}>중복확인</button>
            {idVerification === false && <p>이미 존재하는 아이디입니다.</p>}
          </div>
          <div className={styles.password_box}>
            <input type='password' name='inputPassword' placeholder='비밀번호' value={inputPassword} onChange={changeInputPassword} required />
          </div>
          <div className={styles.password_box}>
            <input type='password' name='inputPasswordCheck' placeholder='비밀번호' value={inputPasswordCheck} onChange={changeInputPasswordCheck} required />
            {passwordConfirmation === false && <p>비밀번호가 일치하지 않습니다</p>}
          </div>
          <div className={styles.name_box}>
            <input type='text' name='inputName' placeholder='이름' value={inputName} onChange={changeInputName} required />
          </div>
          <div className={styles.nickname_box}>
            <input type='text' name='inputNickname' placeholder='닉네임' value={inputNickname} onChange={changeInputNickname} required />
            <button type='button' onClick={verifyNicknameHandler}>중복확인</button>
            {nicknameVerification === false && <p>이미 존재하는 닉네임입니다.</p>}
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.submit_button} type='button' onClick={submit_handler}>회원가입</button>
        </div>
      </Main>
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 1. 로그인 상태 확인 및 내 정보 불러오기
  // 현재 브라우저에서 로그인을 하면서 생성된 쿠키가 있는지 확인
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadMyInfo());

  // 2. 페이지 상태 설정
  store.dispatch(setPage({
    category: 'signup'
  }));

  return {
    props: {},
  };
});

export default Signup;