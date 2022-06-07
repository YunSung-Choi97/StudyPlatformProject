const express = require('express');
const app = express();
const db = require('./db');
const getNow = require('./lib/get_now');

// 회원 정보 처리가 되기 전까지 사용할 임시 사용자명
const userName = '최윤성';

// Database 연결
db.connect();

// form에 의한 요청인 {content-type: x-www-form-urlencoded} 해석하는 미들웨어
app.use(express.urlencoded({ extended: true }));

// list_mode일 때 contents정보 요청 처리
app.get('/contents', (req, res) => {
  var sql = `SELECT * FROM contents;`
  db.query(sql, function (error, results) {
    if (error) {
      console.log(error);
      return;
    };
    res.json(results);
  });
});

// content_mode일 때 content정보 요청 처리
app.get('/contents/:contentsId', (req, res) => {
  var sql = `SELECT * FROM contents WHERE content_id = ?;`
  db.query(sql, req.params.contentsId, function (error, results) {
    if (error) {
      console.log(error);
      return;
    };
    res.json(results[0]);
  });
});

// write_mode일 때 글쓰기 요청 처리
app.post('/write', (req, res) => {
  var sql = `INSERT INTO contents (title, body, recruitment, field, area, author, date) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  var now = getNow();
  db.query(sql, [req.body.title, req.body.body, '모집중', req.body.field, req.body.area, userName, now], function (error, results) {
    if (error) {
      console.log(error);
      return;
    };
    res.redirect('/');
  });
});

// 5000번 포트에서 서버 실행
app.listen(5000, () => { console.log(`Server started on port 5000`); })