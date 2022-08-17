const express = require('express');

const db = require('../lib/database');
const changeToKorean = require('../lib/change_to_korean');
const getNow = require('../lib/get_now');

const router = express.Router();

// posts 불러오기
router.post('/load-posts', (req, res) => {
  try {
    // WHREE절
    let whereClause = 'WHERE post_category = ?';
    const values = [changeToKorean(req.body.category)];
    if (req.body.section) {
      whereClause += ' AND post_section = ?';
      values.push(changeToKorean(req.body.section));
    }
    if (req.body.status) {
      whereClause += ' AND post_status = ?';
      values.push(req.body.status);
    }
    if (req.body.search) {
      whereClause += ' AND (post_title LIKE ? OR post_content LIKE ?)';
      values.push(`%${req.body.search}%`);
      values.push(`%${req.body.search}%`);
    }
    // ORDER BY절
    let orderByClause = 'ORDER BY post_id DESC LIMIT';
    if (req.body.page) {
      orderByClause += ` ${(req.body.page - 1) * 10}, 10`;
    } else {
      orderByClause += ' 0, 10';
    }

    // SQL 완성
    const sqlForPosts =
      `SELECT post.*, COUNT(post_like.post_id) AS post_like_number
        FROM (SELECT post.*, COUNT(comment.post_id) AS post_comment_number
          FROM (SELECT post_id, post_writer_id, user_nickname AS post_writer_nickname, post_title, post_created_date, post_content
            FROM post
            LEFT JOIN public_userdata ON post_writer_id = user_id
            ${whereClause}
            ${orderByClause}) AS post
          LEFT JOIN comment ON post.post_id = comment.post_id
          GROUP BY post.post_id) AS post
        LEFT JOIN post_like ON post.post_id = post_like.post_id
        GROUP BY post.post_id;`;
    const sqlForLength =
      `SELECT COUNT(*) AS length 
        FROM post
        ${whereClause};`;

    // posts 데이터 불러오기
    db.query(sqlForPosts, values, (error, postsData) => {
      if (error) { throw error; }
      // posts 데이터의 개수 불러오기
      db.query(sqlForLength, values, (error, postCountData) => {
        if (error) { throw error; }

        // 결과 응답
        return res.status(200).json({
          posts: postsData,
          posts_length: postCountData[0].length,
          log: `loadPostsDone(${getNow()})`,
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`loadPostsError(${getNow()})`);
  }
});

module.exports = router;