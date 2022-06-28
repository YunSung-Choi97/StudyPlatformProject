const express = require('express');
const app = express();

// Database 연결
const db = require('./lib/db');
db.connect();

// session 정보 관리 (MySQL 저장소 이용)
const session = require('express-session');
const storeOption = require('./lib/store_option')(session);
app.use(session(storeOption));

// passport 설정
const passport = require('./lib/passport')(app, db);

// content-type이 x-www-form-urlencoded 또는 json 일때 해석하는 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* router */
const authRouter = require('./routes/authRouter')(passport);
const contentsRouter = require('./routes/contentsRouter')(db);
app.use('/api/auth', authRouter);
app.use('/api/contents', contentsRouter);

// 회원가입 기능 (구현중)
app.post('/api/confirm/id', (req, res) => {
  var sql = `SELECT * FROM members where id = ?;`;
  db.query(sql, req.body.inputId, (err, results) => {
    if (err) { throw err; };
    // 입력한 아이디가 사용중인지 확인
    if (results[0]) {
      res.json({ isUsing: true });
    } else {
      res.json({ isUsing: false });
    };
  });
});

app.post('/api/confirm/nickname', (req, res) => {
  var sql = `SELECT * FROM members where nickname = ?;`;
  db.query(sql, req.body.inputNickname, (err, results) => {
    if (err) { throw err; };
    // 입력한 아이디가 사용중인지 확인
    if (results[0]) {
      res.json({ isUsing: true });
    } else {
      res.json({ isUsing: false });
    };
  });
});

const bcrypt = require('bcrypt');
app.post('/api/confirm/register', (req, res) => {
  bcrypt.hash(req.body.inputPwd, 10, (err, hash) => {
    var hashPwd = hash;
    var members_sql = `INSERT INTO members (id, name, nickname) VALUES (?, ?, ?);`;
    db.query(members_sql, [req.body.inputId, req.body.inputName, req.body.inputNickname], (err, results) => {
      if (err) { throw err; };
      var authentication_sql = `INSERT INTO authentication (user_id, user_pwd) VALUES (?, ?);`;
      db.query(authentication_sql, [req.body.inputId, hashPwd], (err, results) => {
        if (err) { throw err; };
        res.json({register: true});
      });
    });
  });
});

// 5000번 포트에서 서버 실행
app.listen(5000, () => { console.log(`Server started on port 5000`); });