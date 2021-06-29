const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const next = require('next');
const fileUpload = require('express-fileupload');
// const fs = require('fs');
// const utils = require('./utils');
const registerRouter = require('./routes/register');
const importRouter = require('./routes/import');
const databaseConnect = require('./database/database');

const app = express();

//connect to db
databaseConnect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());
// app.use(
//   express.static(path.join(__dirname, 'public')));

// app.use(
//   '/uploads',
//   express.static(path.join(__dirname, 'uploads'))
// );

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return next();
});

app.use('/terminal', registerRouter);

app.use('/terminalImport', importRouter);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development'
      ? err
      : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
