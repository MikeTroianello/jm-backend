require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const cors = require('cors');

const session = require('express-session');
const passport = require('passport');

require('./configs/passport');

const uri = process.env.MONGO_DB || 'mongodb://localhost/dummy';

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true,
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//PASSPORT AND SESSIONS

app.use(
  session({
    secret: 'some secret goes here',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'BACKEND';

// app.use(
//   cors({
//     credentials: true,
//     origin: [process.env.ORIGIN],
//   })
// );

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

const index = require('./routes/index');
const register = require('./routes/register');
const groups = require('./routes/groups');
const blog = require('./routes/blog');
const categories = require('./routes/categories');
const challenges = require('./routes/challenges');
const users = require('./routes/users');

app.use('/', index);
app.use('/register', register);
app.use('/groups', groups);
app.use('/blog', blog);
app.use('/categories', categories);
app.use('/challenges', challenges);
app.use('/users', users);

module.exports = app;
