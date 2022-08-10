const express = require('express');

const db = require('../lib/database');

const router = express.Router();

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
    const sqlToCount = 'SELECT COUNT(*) AS length' + sql.substring(8) + ';';
    if (req.body.page) {
      sql += ` ORDER BY post_id DESC LIMIT ${(req.body.page - 1) * 10}, 10;`;
    } else {
      sql += ' ORDER BY post_id DESC LIMIT 0, 10;';
    }

    // posts 데이터 불러오기
    db.query(sql, values, (error, postsData) => {
      if (error) { throw error; }
      // posts 데이터의 개수 불러오기
      db.query(sqlToCount, values, (error, postCountData) => {
        if (error) { throw error; }

        // 결과 응답
        return res.status(200).json({
          posts: postsData,
          posts_length: postCountData[0].length,
          log: `loadPostsDone(${getNow()})`,
        });
      });
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send(`loadPostsError(${getNow()})`);
  }
});

module.exports = router;