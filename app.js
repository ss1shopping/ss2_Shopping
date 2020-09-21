var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose")
// var session=require("express-session")
// var connectRedis=require('connect-redis')
// var Redis=require("ioredis")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shoppingRouter =require("./routes/shopping.route")
const passport =require("passport");
const flash = require('connect-flash');

// const uri =require('./config.json');
// const uri="mongodb+srv://manhtien465:tien1234@cluster0-vaatg.mongodb.net/test?retryWrites=true&w=majority"
// const Session_Option=require("./config/session")
// const Redis_option =require("./config/cache")
const MONGO_Options=require("./config/db")

const connect=mongoose.connect(MONGO_Options.MONGO_URI,MONGO_Options.MONGO_Option)
.then(()=>console.log("connect MongoDb"))
.catch(err=>console.log(err)
)
// const RedisStore = connectRedis(session)
//   const client = new Redis(Redis_option.Redis_Option)
//   const store = new RedisStore({ client })
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

app.use("/shopping",shoppingRouter)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(
//   session({ ...Session_Option,
//     store:new RedisStore({client})
//   })
// )

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
