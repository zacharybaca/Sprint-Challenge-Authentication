const express = require('express');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const knex = require('../database/dbConfig.js');

const server = express();

const sessionConfiguration = {
  name: 'users',
  secret: 'iamauser',
  saveUninitialized: true,
  resave: false,
  store: new KnexSessionStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: 'sid'
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }
};

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(sessions(sessionConfiguration));
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
