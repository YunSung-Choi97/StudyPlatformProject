const passport = require('passport');
const local = require('./local');

const db = require('../database');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser((userId, done) => {
    try {
      const sql = `SELECT * FROM public_userdata WHERE user_id = ?;`;
      db.query(sql, userId, (error, userdata) => {
        if (error) { throw error; };
        if (userdata) {
          const user = {
            id: userdata[0].user_id,
            name: userdata[0].user_name,
            nickname: userdata[0].user_nickname
          };
          done(null, user);
        };
      });
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};