var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const uri =require('./config.json');
// const uri="mongodb+srv://manhtien465:tien1234@cluster0-vaatg.mongodb.net/timi?retryWrites=true&w=majority"
// mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
// const connection=mongoose.connection;
// connection.once('open',()=>{
//   console.log("thanhf cong");
  
// })
// const{Pool,Client}=require("pg")
// const pool=new Pool({
//   user:"tien1",
//   password:"tien1234",
//   host:"localhost",
//   port:5432,
//   database:"postgres"
// })
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
