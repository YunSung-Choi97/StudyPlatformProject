const express = require('express');

const db = require('../lib/database');
const { isLoggedIn } = require('./middlewares');
const getNow = require('../lib/get_now');

const router = express.Router();

// post 불러오기
router.post('/load-post', (req, res) => {
  try {
    const postId = req.body.id;

    // 게시글 정보 불러오기
    let sql = `SELECT * FROM post WHERE post_id = ?;`;
    db.query(sql, postId, (error, postData) => {
      if (error) { throw error; }

      sql = `SELECT * FROM comment WHERE post_id = ?;`;
      db.query(sql, postId, (error, commentData) => {
        if (error) { throw error; }

        return res.status(200).json({
          post: postData[0],
          comments: commentData,
          commentsLength: commentData.length,
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

// 새로운 게시글 추가
router.post('/new-post', isLoggedIn, (req, res) => {
  try {
    const sql = `INSERT INTO post (post_writer_id, post_title, post_category, post_section, post_status, post_created_date, post_content, post_views, post_like_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const values = [req.body.id, req.body.title, req.body.category];
    if (req.body.section !== '선택') {
      values.push(req.body.section);
    } else {
      values.push(null);
    }
    if (req.body.category === '팀원 찾기') {
      values.push('모집중');
    } else {
      values.push(null);
    }
    values.push(getNow(), req.body.content, 0, 0);

    db.query(sql, values, (error, InsertionResult) => {
      if (error) { throw error; }

      return res.status(200).json({
        message: '게시글이 새로 추가되었습니다.',
        id: InsertionResult.insertId,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('게시글 작성에 실패하였습니다.');
  }
});

module.exports = router;