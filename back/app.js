const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const db_option = require('./lib/database/option');
const passportConfig = require('./lib/passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');

dotenv.config();
const app = express();

// cors 설정
app.use(cors({
  origin: true,
  credentials: true
}));

// content-type이 json / x-www-form-urlencoded 일때 해석하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie, session 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MySQLStore(db_option),
  saveUninitialized: false,
  resave: false,
}));

// passport 설정
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// router
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

// 5000번 포트에서 서버 실행
app.listen(5000, () => {
  console.log('started server on http://localhost:5000');
});