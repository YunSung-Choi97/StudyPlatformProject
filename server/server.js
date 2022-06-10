const express = require('express');
const app = express();

// Database 연결
const db = require('./lib/db');
db.connect();

// session 정보 관리 (MySQL 저장소 이용)
const session = require('express-session');
const storeOption = require('./lib/store_option')(session);
app.use(session(storeOption));

// passport 설정
const passport = require('./lib/passport')(app, db);

// content-type이 x-www-form-urlencoded 또는 json 일때 해석하는 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* router */
const authRouter = require('./routes/authRouter')(passport);
const contentsRouter = require('./routes/contentsRouter')(db);
app.use('/api/auth', authRouter);
app.use('/api/contents', contentsRouter);

// 5000번 포트에서 서버 실행
app.listen(5000, () => { console.log(`Server started on port 5000`); });