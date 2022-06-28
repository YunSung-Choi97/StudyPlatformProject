import React from 'react';
import { useState } from 'react';
import styles from './signup_mode.module.css';
import { useNavigate } from 'react-router-dom';

function SignupMode(props) {
  const navigate = useNavigate();
  // 회원가입을 위한 입력 정보 (ID, PWD, Name, Nickname)
  const [inputId, setInputId] = useState('');
  const [inputPwd1, setinputPwd1] = useState('');
  const [inputPwd2, setinputPwd2] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputNickname, setInputNickname] = useState('');

  // 입력 정보가 유효한지 확인 (id 중복확인, 입력한 두 비밀번호 일치 여부, nickname 중복확인)
  const [idConfirmation, setIdConfirmation] = useState(false);
  const [pwdConfirmation, setPwdConfirmation] = useState(false);
  const [nicknameConfirmation, setNicknameConfirmation] = useState(false);

  const [idResult, setIdResult] = useState('');
  const [pwdResult, setPwdResult] = useState('');
  const [nicknameResult, setNicknameResult] = useState('');

  // 중복확인 요청
  const confirmation_handler = (type, body) => {
    let url, _body;
    if (type === 'id') { url = '/api/confirm/id'; _body = new URLSearchParams({ inputId: body }); }
    else if (type === 'nickname') { url = '/api/confirm/nickname'; _body = new URLSearchParams({ inputNickname: body }); }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: _body
    }).then((res) => { return res.json(); })
      .then((result) => {
        if (result.isUsing) {
          if (type === 'id') { setIdConfirmation(false); setIdResult('이미 사용중인 아이디입니다.'); }
          else if (type === 'nickname') { setNicknameConfirmation(false); setNicknameResult('이미 사용중인 닉네임입니다.'); }
        } else {
          if (type === 'id') { setIdConfirmation(true); setIdResult('사용가능한 아이디입니다.'); }
          else if (type === 'nickname') { setNicknameConfirmation(true); setNicknameResult('사용가능한 닉네임입니다.'); }
        }
      });
  };

  const submit_handler = () => {
    // 비밀번호 일치 확인
    if (inputPwd1 === inputPwd2) { setPwdConfirmation(true); }
    else { setPwdConfirmation(false); }

    // 올바른 정보들이 입력되었는지 확인 후 제출 (id 중복확인 > 비밀번호 확인 > nickname 중복확인)
    if (idConfirmation) {
      setIdResult('');
      if (pwdConfirmation) {
        setPwdResult('');
        if (nicknameConfirmation) {
          setNicknameResult('');
          fetch('/api/confirm/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              inputId: inputId,
              inputPwd: inputPwd1,
              inputName: inputName,
              inputNickname: inputNickname
            }).then((res) => { return res.json(); })
            .then((result) => {
              if (result.register === true) { console.log('회원가입 성공'); navigate('/'); }
              else { }
            })
          })
        } else {
          setNicknameResult('닉네임 중복확인이 필요합니다.')
        }
      } else {
        setPwdResult('입력하신 두 비밀번호가 일치하지 않습니다.');
        setNicknameResult('');
      }
    } else {
      setIdResult('아이디 중복확인이 필요합니다.');
      setPwdResult('');
      setNicknameResult('');
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.id_box}>
          <input type='text' name='inputId' placeholder='아이디' value={inputId} onChange={(event) => { setInputId(event.target.value); }} />
          <button type='button' onClick={() => { confirmation_handler('id', inputId); }}>중복확인</button>
          <p>{idResult}</p>
        </div>
        <div className={styles.pwd_box}>
          <input type='password' name='inputPwd1' placeholder='비밀번호' value={inputPwd1} onChange={(event) => { setinputPwd1(event.target.value); }} />
        </div>
        <div className={styles.pwd_box}>
          <input type='password' name='inputPwd2' placeholder='비밀번호' value={inputPwd2} onChange={(event) => { setinputPwd2(event.target.value); }} />
          <p>{pwdResult}</p>
        </div>
        <div className={styles.name_box}>
          <input type='text' name='inputName' placeholder='이름' value={inputName} onChange={(event) => { setInputName(event.target.value); }} />
        </div>
        <div className={styles.nickname_box}>
          <input type='text' name='inputNickname' placeholder='닉네임' value={inputNickname} onChange={(event) => { setInputNickname(event.target.value); }} />
          <button type='button' onClick={() => { confirmation_handler('nickname', inputNickname); }}>중복확인</button>
          <p>{nicknameResult}</p>
        </div>
      </div>
      <div className={styles.button}>
        <button className={styles.submit_button} type='button' onClick={() => { submit_handler(); }}>제출</button>
      </div>
    </>
  );
}

export default SignupMode;