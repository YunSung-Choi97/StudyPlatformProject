const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('../lib/database');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const getNow = require('../lib/get_now');

const router = express.Router();

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (serverError, userData, clientError) => {
    if (serverError) {
      console.error(serverError);
      return next(serverError);
    }

    if (clientError) {
      return res.status(401).send(clientError.message);
    }

    return req.login(userData, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json(userData);
    });
  })(req, res, next);
});

// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  try {
    if (req.user.id !== req.body.id) {
      var error = new Error('로그인 정보 불일치');
      error.name = 'userInfoMismatch';
      throw error;
    }
    req.logout((error) => {
      if (error) { throw error; }
      req.session.destroy((error) => {
        if (error) { throw error; }
        return res.status(200).send('로그아웃 성공');
      });
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'userInfoMismatch') {
      return res.status(401).send('로그인 정보가 불일치합니다.');
    }
    return res.status(500).send('로그아웃 실패');
  }
});

// 회원가입
router.post('/signup', isNotLoggedIn, (req, res) => {
  try {
    let sql = `INSERT INTO public_userdata (user_id, user_name, user_nickname) VALUES (?, ?, ?);`;
    db.query(sql, [req.body.inputId, req.body.inputName, req.body.inputNickname], (error, InsertionResult) => {
      if (error) { throw error; }
      bcrypt.hash(req.body.inputPassword, 11, (error, hashedPassword) => {
        if (error) { throw error; }
        sql = `INSERT INTO private_userdata (user_id, user_password, account_created_date, password_updated_last_date) VALUES (?, ?, ?, ?);`;
        const now = getNow();
        db.query(sql, [req.body.inputId, hashedPassword, now, now], (error, InsertionResult) => {
          if (error) { throw error; }
          return res.status(200).send('회원가입 성공');
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('error');
  }
});

// 아이디 중복확인
router.post('/verify-id', isNotLoggedIn, (req, res) => {
  try {
    const sql = `SELECT user_id FROM public_userdata WHERE user_id = ?`;
    db.query(sql, req.body.inputId, (error, userData) => {
      if (error) { throw error; }

      if (userData[0]) {
        return res.status(401).send(`${req.body.inputId}은 이미 존재하는 아이디입니다.`);
      }
      return res.status(200).send(`${req.body.inputId}은 사용가능한 아이디입니다.`);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('error');
  }
});

// 닉네임 중복확인
router.post('/verify-nickname', isNotLoggedIn, (req, res) => {
  try {
    const sql = `SELECT user_id FROM public_userdata WHERE user_nickname = ?`;
    db.query(sql, req.body.inputNickname, (error, userData) => {
      if (error) { throw error; }

      if (userData[0]) {
        return res.status(401).send(`${req.body.inputNickname}은 이미 존재하는 닉네임입니다.`);
      }
      return res.status(200).send(`${req.body.inputNickname}은 사용가능한 닉네임입니다.`);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('error');
  }
});


// 내 정보 불러오기
router.get('/load-my-info', (req, res) => {
  if (req.user) {
    return res.status(200).json({
      isLoggedIn: true,
      myInfo: req.user
    });
  } else {
    return res.status(200).json({
      isLoggedIn: false,
      myInfo: null
    });
  }
});

module.exports = router;
