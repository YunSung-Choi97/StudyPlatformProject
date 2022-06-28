const express = require('express');
const router = express.Router();

module.exports = (passport) => {
  // 로그인 상태 전송
  router.get('/is_user', (req, res) => {
    if (req.user) { res.json(req.user); }
    else { res.json({ isLogin: false }); };
  });

  // login 요청 처리
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/api/auth/login_fail'
  }), (req, res) => {
    res.end();
  });

  // login에 실패했을 때 처리
  router.get('/login_fail', (req, res) => {
    res.end();
  });

  // logout 요청 처리
  router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.end();
    })
  });

  return router;
};