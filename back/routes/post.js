const express = require('express');

const db = require('../lib/database');
const getNow = require('../lib/get_now');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// post 불러오기
router.post('/load-post', (req, res) => {
  try {
    const postId = req.body.post_id;
    const userId = req.body.user_id;

    // 게시글 정보 불러오기
    let sql =
      `SELECT post.*, COUNT(post_like.post_id) AS post_like_number
        FROM (SELECT post_id, post_writer_id, user_nickname AS post_writer_nickname, post_title, post_created_date, post_content
          FROM post 
          LEFT JOIN public_userdata ON post_writer_id = user_id
          WHERE post.post_id = ?) AS post
        LEFT JOIN post_like ON post.post_id = post_like.post_id
        GROUP BY post.post_id;`;
    db.query(sql, postId, (error, postData) => {
      if (error) { throw error; }

      // 요청된 post_id의 게시글이 존재하지 않는 경우
      if (postData.length === 0) {
        return res.status(200).json({
          post: null,
          comments: null,
          commentsLength: null,
          liking: null,
          log: `loadPostDone(${getNow()})`,
        });
      }
      // 댓글 정보 불러오기
      sql =
        `SELECT comment_id, comment_writer_id, user_nickname AS comment_writer_nickname, comment_created_date, comment_content
          FROM comment
          LEFT JOIN public_userdata ON comment_writer_id = user_id
          WHERE post_id = ?;`;
      db.query(sql, postId, (error, commentData) => {
        if (error) { throw error; }

        // 좋아요 정보 불러오기
        if (userId) {
          sql = `SELECT * FROM post_like WHERE post_id = ? AND post_liked_user_id = ?;`;
          db.query(sql, [postId, userId], (error, likeData) => {
            if (error) { throw error; }

            return res.status(200).json({
              post: postData[0],
              comments: commentData,
              commentsLength: commentData.length,
              liking: likeData.length !== 0 ? true : false,
              log: `loadPostDone(${getNow()})`,
            });
          });
        } else {
          return res.status(200).json({
            post: postData[0],
            comments: commentData,
            commentsLength: commentData.length,
            liking: null,
            log: `loadPostDone(${getNow()})`,
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`loadPostError(${getNow()})`);
  }
});

// 게시글 좋아요 요청
router.post('/start-liking', isLoggedIn, (req, res) => {
  try {
    const sql = `INSERT INTO post_like (post_id, post_liked_user_id) VALUES (?, ?);`;
    db.query(sql, [req.body.postId, req.body.userId], (error, postLikeData) => {
      if (error) { throw error; }

      return res.status(200).send(`startLikingDone(${getNow()})`);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`startLikingError(${getNow()})`);
  }
});

// 게시글 좋아요 취소 요청
router.post('/terminate-liking', isLoggedIn, (req, res) => {
  try {
    const sql = `DELETE FROM post_like WHERE post_id = ? AND post_liked_user_id = ?;`;
    db.query(sql, [req.body.postId, req.body.userId], (error, postLikeData) => {
      if (error) { throw error; }
      // debug 해결
      return res.status(200).send(`startLikingDone(${getNow()})`);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`terminateLikingError(${getNow()})`);
  }
});

// 게시글 작성하기
router.post('/add-post', isLoggedIn, (req, res) => {
  try {
    const sql =
      `INSERT INTO post
        (post_writer_id, post_title, post_category, post_section, post_status, post_created_date, post_content, post_views)
        VALUES (?, ?, ?, ?, ?, now(), ?, ?);`;

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
    values.push(req.body.content, 0);

    db.query(sql, values, (error, InsertionResult) => {
      if (error) { throw error; }

      return res.status(200).json({
        id: InsertionResult.insertId,
        log: `addPostDone(${getNow()})`,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`addPostError(${getNow()})`);
  }
});

// 게시글 삭제하기
router.post('/delete-post', isLoggedIn, (req, res) => {
  try {
    const sql = `DELETE FROM post WHERE post_id = ?;`;
    db.query(sql, req.body.post_id, (error, deletionResult) => {
      if (error) { throw error; }

      return res.status(200).send(`deletePostDone(${getNow()})`);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`deletePostError(${getNow()})`);
  }
});

// 댓글 작성하기
router.post('/add-comment', isLoggedIn, (req, res) => {
  try {
    let sql =
      `INSERT INTO comment
        (post_id, comment_writer_id, comment_created_date, comment_content)
        VALUES (?, ?, now(), ?);`;
    const values = [req.body.post_id, req.body.comment_writer_id, req.body.comment_content];

    db.query(sql, values, (error, InsertionResult) => {
      if (error) { throw error; }

      sql =
        `SELECT comment_id, comment_writer_id, user_nickname AS comment_writer_nickname, comment_created_date, comment_content
          FROM comment
          LEFT JOIN public_userdata ON comment_writer_id = user_id
          WHERE post_id = ?;`;
      db.query(sql, req.body.post_id, (error, commentsData) => {
        if (error) { throw error; }

        return res.status(200).json({
          comments: commentsData,
          commentsLength: commentsData.length,
          log: `addCommentDone(${getNow()})`,
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`addCommentError(${getNow()})`);
  }
});

// 댓글 삭제하기
router.post('/delete-comment', isLoggedIn, (req, res) => {
  try {
    let sql = `DELETE FROM comment WHERE comment_id = ?;`;
    db.query(sql, req.body.comment_id, (error, deletionResult) => {
      if (error) { throw error; }

      sql =
        `SELECT comment_id, comment_writer_id, user_nickname AS comment_writer_nickname, comment_created_date, comment_content
          FROM comment
          LEFT JOIN public_userdata ON comment_writer_id = user_id
          WHERE post_id = ?;`;
      db.query(sql, req.body.post_id, (error, commentsData) => {
        if (error) { throw error; }

        return res.status(200).json({
          comments: commentsData,
          commentsLength: commentsData.length,
          log: `deleteCommentDone(${getNow()})`,
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`deleteCommentError(${getNow()})`);
  }
});

module.exports = router;