import express from 'express';
require('dotenv').config();

import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import ejs from 'ejs';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { sequelize } from './models';

const app = express();
app.set('port', process.env.PORT || 5050);
app.set('view engine', 'ejs');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

// test routers

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} There is no Router`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;
