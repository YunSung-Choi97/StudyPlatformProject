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
    const categories = {
      'community': '커뮤니티',
      'find-member': '팀원 찾기',
      'review': '후기/평점',
      'recruitment': '채용정보',
    };
    const sections = {
      'free': '자유 게시판',
      'information': '정보 게시판',
      'question': '질문 게시판',
      'study': '스터디',
      'project': '프로젝트',
      'contest': '공모전',
    };

    // 페이지 state에 따라 필요한 sql 생성
    let sql = 'SELECT * FROM post WHERE post_category = ?';
    const values = [categories[req.body.category]];
    if (req.body.section) {
      sql += ' AND post_section = ?';
      values.push(sections[req.body.section]);
    }
    if (req.body.status) {
      sql += ' AND post_status = ?';
      values.push(req.body.status);
    }
    if (req.body.search) {
      sql += ' AND (post_title LIKE ? OR post_content LIKE ?)';
      values.push(`%${req.body.search}%`);
      values.push(`%${req.body.search}%`);
    }
    const sql_count = 'SELECT COUNT(*) AS length' + sql.substring(8) + ';';
    if (req.body.page) {
      sql += ` ORDER BY post_id DESC LIMIT ${(req.body.page - 1) * 10}, 10;`;
    } else {
      sql += ' ORDER BY post_id DESC LIMIT 0, 10;';
    }

    // posts 데이터 불러오기
    db.query(sql, values, (error, posts_data) => {
      if (error) { throw error; }
      // posts 데이터의 개수 불러오기
      db.query(sql_count, values, (error, count) => {
        if (error) { throw error; }

        // 결과 응답
        return res.status(200).json({
          posts: posts_data,
          posts_length: count[0].length,
        });
      });
    })
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
    db.query(sql, values, (error, result) => {
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