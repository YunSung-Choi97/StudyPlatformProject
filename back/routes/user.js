const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('../lib/database');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (serverError, userId, clientError) => {
    if (serverError) {
      console.error(serverError);
      return next(serverError);
    }
    if (clientError) {
      return res.status(401).send(clientError.message);
    }
    return req.login(userId, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json(userId);
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
    const sql1 = `INSERT INTO public_userdata (id, name, nickname) VALUES (?, ?, ?);`;
    db.query(sql1, [req.body.inputId, req.body.inputName, req.body.inputNickname], (error, result1) => {
      if (error) { throw error; }
      bcrypt.hash(req.body.inputPassword, 11, (error, hashedPassword) => {
        if (error) { throw error; }
        const sql2 = `INSERT INTO private_userdata (id, password) VALUES (?, ?);`;
        db.query(sql2, [req.body.inputId, hashedPassword], (error, result2) => {
          if (error) { throw error; }
          return res.status(200).send('회원가입 성공');
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
});

// debug
router.get('/test', (req, res) => {
  console.log('req.user :');
  console.log(req.user);
  console.log('req.session :');
  console.log(req.session);
  res.status(200).send('test');
});

module.exports = router;
