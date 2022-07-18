import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../components/main';
import Seo from '../components/seo';
import useInput from '../hooks/use_input';
import { signup } from '../redux/actions/user';
import styles from '../styles/signup.module.css';

const Signup = () => {
  const dispatch = useDispatch();

  // 회원가입에 필요한 입력 정보 (id, password, name, nickname)
  const [inputId, changeInputId] = useInput('');
  const [inputPassword, changeInputPassword] = useInput('');
  const [inputName, changeInputName] = useInput('');
  const [inputNickname, changeInputNickname] = useInput('');

  // id 중복 확인
  const [idConfirmation, setIdConfirmation] = useState(undefined);

  // password 일치 확인
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(undefined);
  const changeInputPasswordCheck = useCallback((event) => {
    setInputPasswordCheck(event.target.value);
    setPasswordConfirmation(event.target.value === inputPassword);
  }, [inputPassword, inputPasswordCheck]);

  // nickname 중복 확인
  const [nicknameConfirmation, setNicknameConfirmation] = useState(undefined);

  // 중복확인
  const confirmation_handler = useCallback(() => {

  }, []);

  // 회원가입 입력정보 제출
  const submit_handler = useCallback(() => {
    // id 중복확인 결과 확인
    // 코드 미작성

    // 비밀번호 일치 재확인
    if (inputPassword !== inputPasswordCheck) {
      console.log(`회원가입 실패 : ${inputId}, ${inputPassword}, ${inputPasswordCheck}, ${inputName}, ${inputNickname}`);
      return setPasswordConfirmation(false);
    }

    // nickname 중복확인 결과 재확인
    // 코드 미작성

    // 유효한 입력정보가 제출
    dispatch(signup({ inputId, inputPassword, inputName, inputNickname }));
    console.log(`회원가입 성공 : ${inputId}, ${inputPassword}, ${inputPasswordCheck}, ${inputName}, ${inputNickname}`);
  }, [inputId, inputPassword, inputPasswordCheck, inputName, inputNickname]);

  return (
    <>
      <Seo title='DCW' />
      <Main>
        <div className={styles.container}>
          <div className={styles.id_box}>
            <input type='text' name='inputId' placeholder='아이디' value={inputId} onChange={changeInputId} required />
            <button type='button' onClick={confirmation_handler}>중복확인</button>
            {idConfirmation === false && <p>아이디 중복확인이 필요합니다</p>}
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
            <button type='button' onClick={confirmation_handler}>중복확인</button>
            {nicknameConfirmation === false && <p>닉네임 중복확인이 필요합니다</p>}
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.submit_button} type='button' onClick={submit_handler}>회원가입</button>
        </div>
      </Main>
    </>
  );
};

export default Signup;