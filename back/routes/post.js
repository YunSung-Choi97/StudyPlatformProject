const express = require('express');

const db = require('../lib/database');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const getNow = require('../lib/get_now');

const router = express.Router();

// post 불러오기
router.post('/load-post', (req, res) => {
  try {
    const sql = `SELECT * FROM post WHERE post_id = ?;`;
    db.query(sql, req.body.id, (error, result) => {
      if (error) { throw error; }
      return res.status(200).json(result[0]);
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

// posts 불러오기
router.post('/load-posts', (req, res) => {
  try {
    const category = {
      'community': '커뮤니티',
      'find-member': '팀원 찾기',
      'review': '후기/평점',
      'recruitment': '채용정보',
    };
    const section = {
      'free': '자유 게시판',
      'information': '정보 게시판',
      'question': '질문 게시판',
      'study': '스터디',
      'project': '프로젝트',
      'contest': '공모전',
    };

    const sql = !req.body.section
      ? !req.body.status || req.body.status === '전체'
        ? `SELECT * FROM post WHERE post_category = ? ORDER BY post_id DESC LIMIT 0, 10;`
        : `SELECT * FROM post WHERE post_category = ? AND post_status = ? ORDER BY post_id DESC LIMIT 0, 10;`
      : !req.body.status || req.body.status === '전체'
        ? `SELECT * FROM post WHERE post_category = ? AND post_section = ? ORDER BY post_id DESC LIMIT 0, 10;`
        : `SELECT * FROM post WHERE post_category = ? AND post_section = ? AND post_status = ? ORDER BY post_id DESC LIMIT 0, 10;`;
    const values = !req.body.section
      ? !req.body.status || req.body.status === '전체'
        ? [category[req.body.category]]
        : [category[req.body.category], req.body.status]
      : !req.body.status || req.body.status === '전체'
        ? [category[req.body.category], section[req.body.section]]
        : [category[req.body.category], section[req.body.section], req.body.status];
    db.query(sql, values, (error, result) => {
      if (error) { throw error; }
      return res.status(200).json(result);
    })
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

// 새로운 게시글 추가
router.post('/new-post', isLoggedIn, (req, res) => {
  try {
    const sql1 = `INSERT INTO post (post_writer_id, post_title, post_category, post_section, post_status, post_created_date, post_content, post_views, post_like_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const now = getNow()
    const values = req.body.section !== '선택'
      ? req.body.category === '팀원 찾기'
        ? [req.body.id, req.body.title, req.body.category, req.body.section, '모집중', now, req.body.content, 0, 0]
        : [req.body.id, req.body.title, req.body.category, req.body.section, null, now, req.body.content, 0, 0]
      : req.body.category === '팀원 찾기'
        ? [req.body.id, req.body.title, req.body.category, null, '모집중', now, req.body.content, 0, 0]
        : [req.body.id, req.body.title, req.body.category, null, null, now, req.body.content, 0, 0];
    db.query(sql1, values, (error, result) => {
      if (error) { throw error; }
      return res.status(200).json({
        message: '게시글이 새로 추가되었습니다.',
        id: result.insertId,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('게시글 작성에 실패하였습니다.');
  }
});

module.exports = router;