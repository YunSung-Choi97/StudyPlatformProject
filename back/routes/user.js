const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('../lib/database');
const getNow = require('../lib/get_now');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 내 정보 불러오기
router.get('/load-my-info', (req, res) => {
  if (req.user) {
    return res.status(200).json({
      isLoggedIn: true,
      myInfo: req.user,
      log: `LoadMyInfoDone(${getNow()})`,
    });
  } else {
    return res.status(401).json({
      isLoggedIn: false,
      myInfo: null,
      log: `LoadMyInfoError(${getNow()})`,
    });
  }
});

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
      return res.status(200).json({
        myInfo: userData,
        log: `loginDone(${getNow()})`,
      });
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
        return res.status(200).send(`logoutDone(${getNow()})`);
      });
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'userInfoMismatch') {
      return res.status(401).send(`logoutError(${getNow()})`);
    }
    return res.status(500).send(`logoutError(${getNow()})`);
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
        sql = `INSERT INTO private_userdata (user_id, user_password, account_created_date, password_updated_last_date) VALUES (?, ?, now(), now());`;
        db.query(sql, [req.body.inputId, hashedPassword], (error, InsertionResult) => {
          if (error) { throw error; }
          return res.status(200).json({
            log: `signupDone(${getNow()})`,
            message: `${req.body.inputNickname}님 환영합니다.`,
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      log: `signupError(${getNow()})`,
      message: '회원가입에 실패했습니다. 다시 시도해주세요.',
    });
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

module.exports = router;