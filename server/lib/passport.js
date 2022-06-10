const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const passportSetting = (app, db) => {
  // passport 초기화
  app.use(passport.initialize());
  app.use(passport.session());

  // 로그인 성공 시 유저 정보 초기화
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // 서버에 요청시 유저 정보 관리
  passport.deserializeUser((id, done) => {
    var sql = `SELECT * FROM members WHERE id = ?;`;
    db.query(sql, id, (err, userdata) => {
      if (err) { console.log(err); };
      if (userdata) {
        var user = {
          isLogin: true,
          id: userdata[0].id,
          name: userdata[0].name,
          nickname: userdata[0].nickname
        }
        done(null, user);
      };
    });
  });

  // 로그인 처리
  passport.use(new LocalStrategy((inputId, inputPwd, done) => {
    // DataBase의 회원정보와 비교
    // 1) 입력한 ID 존재 확인  2) 비밀번호 일치 확인
    var sql = `SELECT * FROM authentication WHERE user_id = ?;`;
    db.query(sql, inputId, function (error, userdata) {
      if (error) { throw error };
      if (userdata[0]) {
        bcrypt.compare(inputPwd, userdata[0].user_pwd, (err, isCorrect) => {
          if (isCorrect) {
            return done(null, inputId);
          } else {
            return done(null, false, { message: 'Incorrect password' })
          }
        })
      } else {
        return done(null, false, { message: 'Incorrect username' })
      }
    });
  }));
  return passport;
}

module.exports = passportSetting;