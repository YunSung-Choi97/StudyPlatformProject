const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const db = require('../database');

module.exports = () => {
  /* local 로그인 처리전략 구현 */
  passport.use(new LocalStrategy({
    usernameField: 'inputId',
    passwordField: 'inputPassword'
  }, (inputId, inputPassword, done) => {
    try {
      // DataBase의 회원정보와 비교
      const sql1 = `SELECT user_id, user_password FROM private_userdata WHERE user_id = ?;`;
      db.query(sql1, inputId, (error, userPrivateData) => {
        // Database에서 정보를 읽어오는 과정에서 에러가 발생한 경우
        if (error) { throw error }

        // 입력받은 ID가 존재하지 않는 경우
        if (!userPrivateData[0]) {
          return done(null, false, { message: '존재하지 않는 사용자입니다.' });
        }

        // Password 일치여부 확인
        bcrypt.compare(inputPassword, userPrivateData[0].user_password, (error, isCorrect) => {
          // Password 정보를 비교하는 과정에서 에러가 발생한 경우
          if (error) { throw error };

          // 유효한 ID, password 입력된 경우 (로그인 성공)
          if (isCorrect) {
            const sql2 = `SELECT * FROM public_userdata WHERE user_id = ?;`;
            db.query(sql2, inputId, (error, userPublicData) => {
              // Database에서 정보를 읽어오는 과정에서 에러가 발생한 경우
              if (error) { throw error }

              return done(null, userPublicData[0]);
            });
          }

          // password 불일치
          else { return done(null, false, { message: '비밀번호가 일치하지 않습니다.' }) }
        });
      });
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }));
};