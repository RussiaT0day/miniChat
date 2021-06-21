require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const hbs = require('hbs');
const MongoStore = require('connect-mongo');

const dbConnect = require('./db/connect');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const editRouter = require('./routes/edit');

const app = express();

// view engine setup
app.set('views', path.join(process.env.PWD, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({
    mongoUrl: process.env.MONGOURL,
  })
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/edit', editRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(process.env.PORT, () => {
  console.log('Server start');
  dbConnect();
})

module.exports = app;
