const passport = require('passport');
const local = require('./local');

const db = require('../database');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    try {
      const sql = `SELECT * FROM public_userdata WHERE id = ?;`;
      db.query(sql, userId, (error, userdata) => {
        if (error) { throw error; };
        if (userdata) {
          const user = {
            id: userdata[0].id,
            name: userdata[0].name,
            nickname: userdata[0].nickname
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