import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login_mode.module.css';

function LoginMode(props) {
  const navigate = useNavigate();
  const login_handler = (event) => {
    event.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: `${event.target.inputId.value}`,
        password: `${event.target.inputPwd.value}`
      })
    }).then((res) => {
      if (res.redirected) {
        window.location.reload();
      } else {
        navigate('/');
      }
    });
  };

  return (
    <form className={styles.container} action='/api/auth/login' method='post' onSubmit={(event) => { login_handler(event); }}>
      <div className={styles.login_wrap}>
        <div className={styles.id_box}>
          <input type='text' name='inputId' placeholder='아이디' />
        </div>
        <div className={styles.pwd_box}>
          <input type='password' name='inputPwd' placeholder='비밀번호' />
        </div>
      </div>
      <button type='submit'>로그인</button>
    </form>
  );
}

export default LoginMode;