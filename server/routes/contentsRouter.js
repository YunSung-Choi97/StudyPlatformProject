const express = require('express');
const router = express.Router();
const getNow = require('../lib/get_now');

module.exports = (db) => {
  // list_mode일 때 contents정보 요청 처리
  router.get('/', (req, res) => {
    var sql = `SELECT * FROM contents;`
    db.query(sql, function (error, results) {
      if (error) { throw error };
      res.json(results);
    });
  });

  // content_mode일 때 content정보 요청 처리
  router.get('/:contentsId', (req, res) => {
    var sql = `SELECT * FROM contents WHERE content_id = ?;`;
    db.query(sql, req.params.contentsId, function (error, results) {
      if (error) { throw error };
      res.json(results[0]);
    });
  });

  // write_mode일 때 글쓰기 요청 처리
  router.post('/write', (req, res) => {
    var sql = `INSERT INTO contents (title, body, recruitment, field, area, author, date) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    var now = getNow();
    db.query(sql, [req.body.title, req.body.body, '모집중', req.body.field, req.body.area, req.user.nickname, now], function (error, results) {
      if (error) { throw error };
      res.redirect('/');
    });
  });

  return router;
};